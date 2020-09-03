import {expect, test} from '@oclif/test'
import {getProjectById, getProjectFrom, getProjectNameFrom} from '../../src/utils/project'
import factories from '../../src/api/factories'
import {TOGGL_API_URL} from '../../src/api/constants'
import {paths as authPaths} from '../../src/api/user'
import {Scope as MockApi} from 'nock'

describe('project utils', () => {
  // TODO refactor with fishery 1.0
  const project1 = factories.project.build({id: 1, wid: 1})
  const project2 = factories.project.build({id: 2, wid: 1})
  const user = factories.user.build()
  const userWithProjects = {since: user.since, data: {...user.data, projects: [project1, project2]}}
  const mockGetUserRequest = (api: MockApi) => api.persist().get(authPaths.me).reply(200, userWithProjects)

  describe('gets project from a time entry', () => {
    const project = factories.project.build({id: 1, wid: 1})
    const timeEntry = factories.timeEntry.build({pid: 1})

    test.nock(TOGGL_API_URL, mockGetUserRequest)
    .it('returns a time entry\'s project', async () => {
      expect(await getProjectFrom(timeEntry)).to.eql(project)
    })
  })

  describe('gets project name from time Entry', () => {
    test.nock(TOGGL_API_URL, mockGetUserRequest)
    .it('returns time entry\'s project name', async () => {
      const timeEntry = factories.timeEntry.build({pid: 1})
      const project = factories.project.build({id: 1, wid: 1})

      expect(await getProjectNameFrom(timeEntry)).to.eql(project.name)
    })

    describe('gets project name from time Entry', () => {
      it('returns empty string if time entry has no project', async () => {
        const timeEntry = factories.timeEntryWithoutProject.build()
        expect(await getProjectNameFrom(timeEntry)).to.eql('')
      })
    })
  })

  describe('does not fail if time entry has no project', () => {
    it('returns an empty sc', () => {
      const projects = factories.project.buildList(3)
      expect(getProjectById(projects[0].id, projects)).to.eql(projects[0])
    })

    // Another function(s) depend on this behavior, sanity unit test: getProjectFromTimeEntry
    it('returns undefined if they are no projects', () => {
      expect(getProjectById(1, [])).to.be.undefined
    })
  })
})
