import {Command, flags} from '@oclif/command'
import {startTimeEntry} from '../../api/time-entry'
import * as inquirer from 'inquirer'
import {prompt} from 'inquirer'
import {Commands} from '../../api/constants'
import {green} from 'chalk'
import {Project} from '../../..'
import {getUserProjects} from '../../api/user'
import {isEmpty} from 'lodash'

inquirer.registerPrompt('search-list', require('inquirer-search-list'))

export default class EntryStart extends Command {
    static description = 'Start a new time entry'

    static stdout = {
      prompt: {
        entryDescription: 'Entry description',
        project: 'Select a Project',
      },
      error: {
        noTimeEntryDescription: 'Please, add a description',
      },
      timeEntryDescription: (description: string) =>
        green(`Started time entry '${description}'`),
      timeEntryDescriptionWithProject: (description: string, projectName: string) =>
        green(`Started time entry '${description}' on ${projectName}`),
    }

    static flags = {
      help: flags.help({char: 'h'}),
    }

    static examples = [`toggl ${Commands.EntryStart}`]

    static askForDescription = () =>
      prompt<{ description: string }>([
        {
          type: 'input',
          name: 'description',
          message: EntryStart.stdout.prompt.entryDescription,
          validate: EntryStart.validateDescription,
        },
      ])

    static validateDescription(description: string) {
      if (!description.trim()) return EntryStart.stdout.error.noTimeEntryDescription
      return true
    }

    static selectProject = (projects: Project[]) =>
      prompt<{ project: Project }>([
        {
          type: 'search-list',
          choices: projects.map(p => ({name: p.name, value: p})),
          name: 'project',
          message: EntryStart.stdout.prompt.project,
        },
      ])

    async run() {
      try {
        const userProjects = await getUserProjects()
        const userHasNoProjects = isEmpty(userProjects)

        const {description} = await EntryStart.askForDescription()

        if (userHasNoProjects) {
          await startTimeEntry({description})
          this.log(EntryStart.stdout.timeEntryDescription(description))
        } else {
          const {project} = await EntryStart.selectProject(userProjects)
          await startTimeEntry({description, pid: project.id})
          this.log(EntryStart.stdout.timeEntryDescriptionWithProject(description, project.name))
        }
      } catch (error) {
        this.error(error.message)
      }
    }
}

