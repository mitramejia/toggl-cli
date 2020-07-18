import {expect, test} from '@oclif/test'
import {Commands, TOGGL_API_URL} from '../../src/api/constants'
import {paths as entriesPaths} from '../../src/api/time-entries'
import factories from '../../src/api/factories'
import Current from '../../src/commands/current'
import {paths as authPaths} from '../../src/api/auth'

describe(Commands.Current, () => {
  const currentProject = factories.project.build({id: 1})
  const timeEntryResponse = factories.timeEntryResponse.build({
    data: factories.timeEntry.build({pid: 1}),
  })
  const user = factories.user.build({data: {projects: [currentProject]}})
  test
  .stdout()
  .nock(TOGGL_API_URL, api =>
    api.persist()
    .get(authPaths.me)
    .reply(200, user)
    .get(entriesPaths.current)
    .reply(200, timeEntryResponse)

  )
  .command([Commands.Current])
  .it('shows current entry description and project', ctx => {
    const currentTimeEntry = Current.stdout.entry(
      timeEntryResponse.data,
      currentProject.name
    )
    expect(ctx.stdout).to.contain(currentTimeEntry)
  })

  test
  .stdout()
  .nock(TOGGL_API_URL, api =>
    api
    .get(entriesPaths.current).reply(200, undefined)
  )
  .command([Commands.Current])
  .it(`shows "${Current.stdout.noEntry}" if there is no current entry`, ctx => {
    expect(ctx.stdout).to.contain(Current.stdout.noEntry)
  })
})
