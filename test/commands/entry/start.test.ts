
import
{expect, test} from '@oclif/test'
import factories from '../../../src/api/factories'
import {paths as authPaths} from '../../../src/api/auth'
import {Commands, TOGGL_API_URL, TOGGL_API_TOKEN_NOT_SET_ERROR} from '../../../src/api/constants'
import {paths as timeEntriesPaths} from '../../../src/api/time-entries'
import EntryStart from '../../../src/commands/entry/start'
import * as inquirer from 'inquirer'
import {green} from 'chalk'

describe(Commands.EntryStart, () => {
  const answers = factories.startCommandAnswers.build()

  test
  .stderr()
  .env({TOGGL_API_TOKEN: undefined})
  .command([Commands.EntryStart])
  .catch(TOGGL_API_TOKEN_NOT_SET_ERROR)
  .it('errors if TOGGL_API_TOKEN is not set')

  test
  .stdout()
  .stub(inquirer, 'prompt', () => Promise.resolve(answers))
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
  .it('starts a new time entry', ctx => {
    const entryStartedNotification = EntryStart.strings.entryStarted(answers.timeEntryDesc, answers.selectedProject)
    expect(green(ctx.stdout)).to.contain(entryStartedNotification)
    expect(ctx.stdout).to.contain('Banned urls disabled')
  })
})

