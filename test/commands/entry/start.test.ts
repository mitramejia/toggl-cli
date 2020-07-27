
import {expect, test} from '@oclif/test'
import factories from '../../../src/api/factories'
import {paths as authPaths} from '../../../src/api/user'
import {Commands, TOGGL_API_URL} from '../../../src/api/constants'
import {paths as timeEntriesPaths} from '../../../src/api/time-entry'
import EntryStart from '../../../src/commands/entry/start'
import * as inquirer from 'inquirer'

describe(Commands.EntryStart, () => {
  const {selectedProject, timeEntryDesc} = factories.startCommandAnswers.build()

  test
  .stdout()
  .stub(inquirer, 'prompt', () => ({selectedProject, timeEntryDesc}))
  .nock(TOGGL_API_URL, api =>
    api
    .persist()
    .get(authPaths.me)
    .reply(200, factories.user.build())
    .post(timeEntriesPaths.start)
    .reply(200, factories.project.buildList(3))
  )
  .command([Commands.EntryStart])
  .hook(Commands.EntryStart)
  .it('starts a new time entry', ({stdout}) => {
    const entryStartedNotification = EntryStart.strings.entryStarted(timeEntryDesc, selectedProject.name)
    expect(stdout).to.contain(entryStartedNotification)
  })
})

