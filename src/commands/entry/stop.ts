import {Command, flags} from '@oclif/command'
import {getCurrentTimeEntry, stopTimeEntry} from '../../api/time-entry'
import {Commands} from '../../api/constants'
import {bold} from 'chalk'
import {getProjectById, getUserProjects} from '../../utils/project'
import {formatProjectName} from '../../utils/time-entry'
import {Project} from '../../..'

export default class EntryStop extends Command {
    static description = 'Stops current time entry'

    static strings = {
      noTimeEntryRunning: 'You have no time entry running.',
      entryStopped: (entryDesc: string, project?: Project) => `Stopped time entry '${bold(entryDesc)}'${formatProjectName(project)}`,
    }

    static flags = {
      help: flags.help({char: 'h'}),
    }

    static examples = [`toggl ${Commands.EntryStop}`]

    async run() {
      try {
        // Get current time entry
        const timeEntry = await getCurrentTimeEntry()
        // Exit if there is no current time entry
        if (!timeEntry) {
          this.error(EntryStop.strings.noTimeEntryRunning)
        }
        const projects = await getUserProjects()
        const project = timeEntry.pid ? getProjectById(timeEntry.pid, projects) : undefined

        // Call API to stop the time entry
        await stopTimeEntry(timeEntry.id)

        this.log(EntryStop.strings.entryStopped(timeEntry.description, project))

        await this.config.runHook(Commands.EntryStop, {id: this.id})
      } catch (error) {
        this.error(error.message)
      }
    }
}

