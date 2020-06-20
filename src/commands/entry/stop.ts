import {Command, flags} from '@oclif/command'
import {getCurrentTimeEntry, stopTimeEntry} from '../../api/time-entries'
import {Commands} from '../../api/constants'

export default class EntryStop extends Command {
    static description = 'Stops current time entry'

    static strings = {
      noTimeEntryRunning: 'You have no time entry running.',
      entryStopped: (entryDesc: string) => `Stopped time entry '${entryDesc}'`,
    }

    static flags = {
      help: flags.help({char: 'h'}),
    }

    static examples = [`toggl ${Commands.EntryStop}`]

    async run() {
      try {
        // Get current time entry
        const currentTimeEntry = await getCurrentTimeEntry()
        // Exit if there is no current time entry
        if (!currentTimeEntry) {
          this.error(EntryStop.strings.noTimeEntryRunning)
        }
        // Call API to Start time entry
        await stopTimeEntry(currentTimeEntry.id)

        this.log(EntryStop.strings.entryStopped(currentTimeEntry.description))

        await this.config.runHook(Commands.EntryStop, {id: this.id})
      } catch (error) {
        this.error(error.message)
      }
    }
}

