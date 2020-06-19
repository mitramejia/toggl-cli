import {expect, test} from '@oclif/test'
import factories from '../../../src/api/factories'
import {paths as authPaths} from '../../../src/api/authentication'
import {TOGGL_API_URL} from '../../../src/api/constants'
import {paths as timeEntriesPaths} from '../../../src/api/time-entries'
import EntryStart, {StartCommandAnswers} from '../../../src/commands/entry/start'
import * as inquirer from 'inquirer'

describe('entry:start', () => {
  const project = factories.project.build()
  const answers: StartCommandAnswers = {
    selectedProject: project.name,
    timeEntryDesc: factories.timeEntry.build({pid: project.id}).description,
  }

  test
  .stdout()
  .stub(inquirer, 'prompt', () => Promise.resolve(answers))
  .nock(TOGGL_API_URL, api =>
    api
    .persist()
    .get(authPaths.me + '?with_related_data=true')
    .reply(200, factories.user.build())
    .post(timeEntriesPaths.start)
    .reply(200, factories.project.buildList(3))
  )
  .command(['entry:start'])
  .it('starts a new time entry', ctx => {
    expect(ctx.stdout).to.contain(EntryStart.strings.entryStarted(answers.timeEntryDesc, answers.selectedProject))
  })
})

