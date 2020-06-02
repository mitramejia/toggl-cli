import {Command} from '@oclif/command'
import {startTimeEntry} from '../lib/api/time-entries'
import {prompt, registerPrompt} from 'inquirer'
import {getUserProjects} from '../lib/api/authentication'
import {Project} from '../lib/api/types'
import {green} from 'chalk'
// Register plugin
registerPrompt('search-list', require('inquirer-search-list'))

interface Answers {
    selectedProjectName: string; taskDescription: string;
}

export default class Start extends Command {
    static description = 'Start a new time entry'

    static examples = ['$ toggl start ']

    private getProjectIdByName(name: string, projects: Project[]) {
      return projects.filter(p => p.name === name)[0].id
    }

    private async promptQuestions(projects: Project[]) {
      const {selectedProjectName, taskDescription} = await prompt<Answers>([
        {type: 'input', name: 'taskDescription', message: 'Entry description'},
        {type: 'search-list', choices: projects.map(p => p.name), name: 'selectedProjectName', message: 'Select a Project'},
      ])
      return {selectedProjectName, taskDescription}
    }

    async run() {
      try {
        // Gather request params
        const projects = await getUserProjects()
        const {selectedProjectName, taskDescription} = await this.promptQuestions(projects)
        const pid = this.getProjectIdByName(selectedProjectName, projects)
        // Call API to Start time entry
        await startTimeEntry({description: taskDescription, pid})
        this.log(green(`Started task '${taskDescription}' on ${selectedProjectName}`))
      } catch (error) {
        this.error(`${error.message}`)
      }
    }
}

