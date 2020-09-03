
import {expect, test} from '@oclif/test'
import factories from '../../../src/api/factories'
import {Commands, TOGGL_API_URL} from '../../../src/api/constants'
import {paths as timeEntriesPaths} from '../../../src/api/time-entry'

import EntryStop from '../../../src/commands/entry/stop'
import {paths as authPaths} from '../../../src/api/user'

describe(Commands.EntryStop, () => {
  test
  .stderr()
  .nock(TOGGL_API_URL, api =>
    api
    .persist()
    .get(timeEntriesPaths.current)
    .reply(200, undefined)
  )
  .command([Commands.EntryStop])
  .catch(EntryStop.strings.noTimeEntryRunning)
  .it('shows error if there is no current time entry')
})

describe(Commands.EntryStop, () => {
  // TODO: Use fishery features to abstract these object constructions
  const project = factories.project.build({id: 1})
  const timeEntryResponse = factories.timeEntryResponse.build({data: {pid: project.id}})
  const user = factories.user.build({data: {
    projects: [factories.project.build({id: 1})],
  }})

  test
  .stdout()
  .nock(TOGGL_API_URL, api =>
    api
    .persist()
    .get(authPaths.me)
    .reply(200, user)
    .get(timeEntriesPaths.current)
    .reply(200, timeEntryResponse)
    .put(timeEntriesPaths.stop(timeEntryResponse.data.id))
    .reply(200, timeEntryResponse)
  )
  .command([Commands.EntryStop])
  .hook(Commands.EntryStop)
  .it('stops current time entry', ({stdout}) => {
    const entryStoppedNotification = EntryStop.strings.entryStopped(timeEntryResponse.data.description, project)
    expect(stdout).to.contain(entryStoppedNotification)
  })
})

