import {Command, flags} from '@oclif/command'
import {gray, green, bold, yellow} from 'chalk'
import {Commands} from '../api/constants'
import {getCurrentTimeEntry} from '../api/time-entries'
import {getUserProjects} from '../api/auth'
import {getProjectById} from '../api/utils'
import {TimeEntry} from '../api/types'

export default class Current extends Command {
  static description = 'Shows current entry';

  static strings = {
    currentEntry: (description: string, projectName = '') =>
      `${green('\u25B6')} ${description}
      ${gray(projectName)}`,
    noCurrentEntry: yellow(
      `Timer is not running. To start a new entry use ${bold(Commands.EntryStart)}`
    ),
    error: yellow('Error getting current time entry.'),
  };

  static flags = {
    help: flags.help({char: 'h'}),
  };

  private showCurrentEntry = async (currentTimeEntry: TimeEntry) => {
    const projects = await getUserProjects()
    const currentProject = getProjectById(currentTimeEntry.pid, projects)

    this.log(
      Current.strings.currentEntry(
        currentTimeEntry.description,
        currentProject.name
      )
    )
  }

  async run() {
    const currentTimeEntry = await getCurrentTimeEntry()
    if (currentTimeEntry) {
      await this.showCurrentEntry(currentTimeEntry)
    } else {
      this.log(Current.strings.noCurrentEntry)
    }
  }
}
