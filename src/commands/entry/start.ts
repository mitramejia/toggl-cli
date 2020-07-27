import {Command, flags} from '@oclif/command'
import {startTimeEntry}  from '../../api/time-entry'
import {prompt}  from 'inquirer'
import {Commands} from '../../api/constants'
import * as inquirer from 'inquirer'
import {green} from 'chalk'
import {Project} from '../../..'
import {getUserProjects} from '../../api/user'
inquirer.registerPrompt('search-list', require('inquirer-search-list'))

export interface StartCommandAnswers {
  selectedProject: Project; timeEntryDesc: string;
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
      // TODO: validate an empty description is not empty
      {type: 'input', name: 'timeEntryDesc', message: EntryStart.strings.prompts.entry},
      {type: 'search-list', choices: projects.map(p => ({name: p.name, value: p})), name: 'selectedProject', message: EntryStart.strings.prompts.project},
    ])

  async run() {
    try {
      const projects = await getUserProjects()
      // prompt user
      const {selectedProject, timeEntryDesc} = await this.promptQuestions(projects)

      await startTimeEntry({description: timeEntryDesc, pid: selectedProject.id})

      this.log(EntryStart.strings.entryStarted(timeEntryDesc, selectedProject.name))

      await this.config.runHook(Commands.EntryStart, {id: this.id})
    } catch (error) {
      this.error(error.message)
    }
  }
}

