import {Command, flags} from '@oclif/command'
import {bold, yellow} from 'chalk'
import {Commands} from '../api/constants'
import {getCurrentTimeEntry} from '../api/time-entry'
import {formatCurrentTimeEntry} from '../utils/time-entry/formatters'
import {TimeEntry} from '../..'
import {getUserProjects} from '../api/user'
import {getProjectById} from '../utils/project'

export default class Current extends Command {
  static description = 'Shows current entry';

  static stdout = {
    entry: formatCurrentTimeEntry,
    noTimeEntry: yellow(`Timer is not running. To start a new entry use ${bold(Commands.EntryStart)}`),
    noTimeEntryDescription: '(no description)',
    noTimeEntryDuration: '',
    noProject: '',
    errorFetchingTimeEntry: yellow('Error getting current time entry.'),
  };

  static flags = {
    help: flags.help({char: 'h'}),
  };

  private showCurrentTimeEntry = async (timeEntry: TimeEntry) => {
    const projects = await getUserProjects()
    const project = getProjectById(timeEntry.pid, projects)
    this.log(Current.stdout.entry({timeEntry, project}))
  }

  async run() {
    const currentTimeEntry = await getCurrentTimeEntry()
    if (currentTimeEntry) {
      await this.showCurrentTimeEntry(currentTimeEntry)
    } else {
      this.log(Current.stdout.noTimeEntry)
    }
  }
}
