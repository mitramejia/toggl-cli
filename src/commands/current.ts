import {Command, flags} from '@oclif/command'
import {gray, green, bold, yellow, hex} from 'chalk'
import {Commands} from '../api/constants'
import {getCurrentTimeEntry} from '../api/time-entries'
import {getUserProjects} from '../api/auth'
import {getProjectById} from '../api/utils'
import {Project, TimeEntry} from '../api/types'
import {flow} from 'lodash/fp'

// TODO: Add test
function getCurrentTimeEntryDuration(duration: number) {
  // If the time entry is currently running, the duration attribute contains a negative value, denoting the start of the time entry in seconds since epoch (Jan 1 1970). The correct duration can be calculated as current_time + duration, where current_time is the current time in seconds since epoch. (integer, required)
  // https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#time-entries
  const now = new Date()
  const secondsSinceEpoch = Math.round(now.getTime() / 1000)
  return duration + secondsSinceEpoch
}

// TODO: Add test
const convertSecondsToHms = (seconds: number) => {
  const SECONDS_PER_DAY = 86400
  const HOURS_PER_DAY = 24
  const days = Math.floor(seconds / SECONDS_PER_DAY)
  const remainderSeconds = seconds % SECONDS_PER_DAY
  const hms = new Date(remainderSeconds * 1000).toISOString().substring(11, 19)
  return hms.replace(/^(\d+)/, h => `${Number(h) + days * HOURS_PER_DAY}`.padStart(2, '0'))
}

// TODO: Add test
const format = flow(getCurrentTimeEntryDuration, convertSecondsToHms)

export default class Current extends Command {
  static description = 'Shows current entry';

  static stdout = {
    entry: ({description, duration}: TimeEntry, {name = '', hex_color = 'gray'}: Project) =>
      `${green('\u25B6')} ${description} ⏰  ${format(duration)} ${hex(hex_color)(name)}`,
    noEntry: yellow(
      `Timer is not running. To start a new entry use ${bold(Commands.EntryStart)}`
    ),
    error: yellow('Error getting current time entry.'),
  };

  static flags = {
    help: flags.help({char: 'h'}),
  };

  private showCurrentEntry = async (timeEntry: TimeEntry) => {
    const projects = await getUserProjects()
    const project = getProjectById(timeEntry.pid, projects)
    this.log(
      Current.stdout.entry(
        timeEntry,
        project
      )
    )
  }

  async run() {
    const currentTimeEntry = await getCurrentTimeEntry()
    if (currentTimeEntry) {
      await this.showCurrentEntry(currentTimeEntry)
    } else {
      this.log(Current.stdout.noEntry)
    }
  }
}
