
import {expect, test} from '@oclif/test'
import factories from '../../../src/api/factories'
import {Commands, TOGGL_API_URL} from '../../../src/api/constants'
import {paths as timeEntriesPaths} from '../../../src/api/time-entries'

import EntryStop from '../../../src/commands/entry/stop'

describe(Commands.EntryStop, () => {
  const timeEntryResponse = factories.timeEntryResponse.build()

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

  test
  .stdout()
  .nock(TOGGL_API_URL, api =>
    api
    .persist()
    .get(timeEntriesPaths.current)
    .reply(200, timeEntryResponse)
    .put(timeEntriesPaths.stop(timeEntryResponse.data.id))
    .reply(200, timeEntryResponse)
  )
  .command([Commands.EntryStop])
  .hook(Commands.EntryStop)
  .it('stops current time entry', ctx => {
    const entryStoppedNotification = EntryStop.strings.entryStopped(timeEntryResponse.data.description)
    expect(ctx.stdout).to.contain(entryStoppedNotification)
    expect(ctx.stdout).to.contain('Banned Urls enabled')
  })
})

