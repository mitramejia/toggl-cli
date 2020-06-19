import {Command, flags} from '@oclif/command'
import {createTimeEntry}  from '../../api/time-entries'
import {prompt}  from 'inquirer'
import {getUserProjects} from '../../api/authentication'
import {Project} from '../../api/types'
import {disableUrls} from '../../url-blocker'
import {getProjectIdByName} from '../../api/utils'

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
    entryStarted: (entryDesc: string, projectName: string) => `Started task '${entryDesc}' on ${projectName}`,
  }

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static examples = ['toggl start']

  private async promptQuestions(projects: Project[]) {
    const questions = [
      {type: 'input', name: 'timeEntryDesc', message: EntryStart.strings.prompts.entry},
      {type: 'search-list', choices: projects.map(p => p.name), name: 'selectedProject', message: EntryStart.strings.prompts.project},
    ]
    return prompt<StartCommandAnswers>(questions)
  }

  async run() {
    try {
      // Gather request params
      const projects = await getUserProjects()
      const {selectedProject, timeEntryDesc} = await this.promptQuestions(projects)
      const pid = getProjectIdByName(selectedProject, projects)
      // Call API to Start time entry
      await createTimeEntry({description: timeEntryDesc, pid})
      // Disable Banned urls
      disableUrls()
      this.log(EntryStart.strings.entryStarted(timeEntryDesc, selectedProject))
    } catch (error) {
      this.error(error.message)
    }
  }
}

