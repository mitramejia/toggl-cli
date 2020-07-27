import {expect, test} from '@oclif/test'
import {Commands, TOGGL_API_URL} from '../../src/api/constants'
import {paths as entriesPaths} from '../../src/api/time-entry'
import factories from '../../src/api/factories'
import Current from '../../src/commands/current'
import {paths as authPaths} from '../../src/api/user'

describe(Commands.Current, () => {
  const project = factories.project.build({id: 1})
  const timeEntryResponse = {data: factories.timeEntry.build({pid: 1})}
  const userWithProject = factories.user.build({data: {projects: [project]}})
  test
  .stdout()
  .nock(TOGGL_API_URL, api =>
    api.persist()
    .get(authPaths.me)
    .reply(200, userWithProject)
    .get(entriesPaths.current)
    .reply(200, timeEntryResponse)
  )
  .command([Commands.Current])
  .it('shows current entry description and project', ({stdout}) => {
    const currentTimeEntry = Current.stdout.entry({
      timeEntry: timeEntryResponse.data,
      project,
    })
    expect(stdout).to.contain(currentTimeEntry)
  })

  describe('user has no current entry', () => {
    test
    .stdout()
    .nock(TOGGL_API_URL, api =>
      api
      .get(entriesPaths.current).reply(200, undefined)
    )
    .command([Commands.Current])
    .it(`shows "${Current.stdout.noTimeEntry}" if there is no current entry`, ({stdout}) => {
      expect(stdout).to.contain(Current.stdout.noTimeEntry)
    })
  })

  describe('current entry has no description', () => {
    const timeEntryWithoutDescription =  factories.timeEntry.build({description: undefined, pid: 1})
    const project = factories.project.build({id: 1})
    const userWithProject = factories.user.build({data: {projects: [project]}})

    test
    .stdout()
    .nock(TOGGL_API_URL, api =>
      api.persist()
      .get(authPaths.me)
      .reply(200, userWithProject)
      .get(entriesPaths.current)
      .reply(200, {data: timeEntryWithoutDescription})
    )
    .command([Commands.Current])
    .it(`shows "${Current.stdout.noTimeEntryDescription}"`, ({stdout}) => {
      expect(stdout).to.contain(Current.stdout.entry({timeEntry: timeEntryWithoutDescription, project}))
    })
  })
})

