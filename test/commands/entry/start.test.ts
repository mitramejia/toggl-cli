import {expect, test} from '@oclif/test'
import factories from '../../../src/api/factories'
import {paths as authPaths} from '../../../src/api/user'
import {Commands, TOGGL_API_URL} from '../../../src/api/constants'
import {paths as timeEntriesPaths} from '../../../src/api/time-entry'
import EntryStart from '../../../src/commands/entry/start'
import {User} from '../../..'
import {set} from 'lodash'

describe(Commands.EntryStart, () => {
  describe('starting a new time entry with a project', () => {
    const project = factories.project.build()
    const description = 'test desc'
    const timeEntry = factories.timeEntry.build({description, pid: project.id})

    test
    .stdout()
    .stub(EntryStart, 'askForDescription', () => ({description}))
    .stub(EntryStart, 'selectProject', () => ({project}))
    .nock(TOGGL_API_URL, api =>
      api
      .persist()
      .get(authPaths.me)
      .reply(200, factories.user.build())
      .post(timeEntriesPaths.start)
      .reply(200, timeEntry)
    )
    .command(Commands.EntryStart)
    .it('starts a new time entry', ({stdout}) => {
      const timeEntryDescriptionWithProject = EntryStart.stdout.timeEntryDescriptionWithProject(description, project.name)
      expect(stdout).to.contain(timeEntryDescriptionWithProject)
    })
  })

  describe('starting a new time entry without a project', () => {
    const description = 'test desc'
    const userWithoutProjects: User = set(factories.user.build(), 'data.projects', [])
    const timeEntryWithoutProject = factories.timeEntry.build({description, pid: undefined})

    test
    .stdout()
    .stub(EntryStart, 'askForDescription', () => ({description}))
    .nock(TOGGL_API_URL, api =>
      api
      .persist()
      .get(authPaths.me)
      .reply(200, userWithoutProjects)
      .post(timeEntriesPaths.start)
      .reply(200, timeEntryWithoutProject)
    )
    .command(Commands.EntryStart)
    .it('starts a new time entry', ({stdout}) => {
      const timeEntryDescription = EntryStart.stdout.timeEntryDescription(description)
      expect(stdout).to.contain(timeEntryDescription)
    })
  })

  describe('validating time entry description from stdin', () => {
    it('should not allow an empty string', () => {
      expect(EntryStart.validateDescription('')).to.eql(EntryStart.stdout.error.noTimeEntryDescription)
      expect(EntryStart.validateDescription('  ')).to.eql(EntryStart.stdout.error.noTimeEntryDescription)
    })
    it('should return true if user enters a description', () => {
      expect(EntryStart.validateDescription('test desc')).to.be.true
    })
  })
})

