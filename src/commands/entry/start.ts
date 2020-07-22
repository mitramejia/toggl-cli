import {Command, flags} from '@oclif/command'
import {startTimeEntry}  from '../../api/time-entries'
import {prompt}  from 'inquirer'
import {getUserProjects} from '../../api/auth'
import {getProjectIdByName} from '../../api/utils'
import {Commands} from '../../api/constants'
import * as inquirer from 'inquirer'
import {green} from 'chalk'
inquirer.registerPrompt('search-list', require('inquirer-search-list'))

export interface StartCommandAnswers {
  selectedProject: string; timeEntryDesc: string;
}

export default class EntryStart extends Command {
  static description = 'Start a new time entry'

  static strings = {
    prompts: {
      entry: 'Entry description',
      project: 'Select a Project',
    },
    entryStarted: (entryDesc: string, projectName: string) => green(`Started time entry '${entryDesc}' on ${projectName}`),
  }

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static examples = [`toggl ${Commands.EntryStart}`]

  private promptQuestions = async (projects: Project[]) =>
    prompt<StartCommandAnswers>([
      {type: 'input', name: 'timeEntryDesc', message: EntryStart.strings.prompts.entry},
      {type: 'search-list', choices: projects.map(p => p.name), name: 'selectedProject', message: EntryStart.strings.prompts.project},
    ])

  async run() {
    try {
      // Gather request params
      const projects = await getUserProjects()
      const {selectedProject, timeEntryDesc} = await this.promptQuestions(projects)
      const pid = getProjectIdByName(selectedProject, projects)
      // Call API to Start time entry
      await startTimeEntry({description: timeEntryDesc, pid})

      this.log(EntryStart.strings.entryStarted(timeEntryDesc, selectedProject))

      await this.config.runHook(Commands.EntryStart, {id: this.id})
    } catch (error) {
      this.error(error.message)
    }
  }
}

