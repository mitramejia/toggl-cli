import {Project, TimeEntry} from '../../..'
import {getCurrentUser} from '../../api/user'

export const getProjectById = (projectId: Project['id'], projects: Project[]) => projects.filter(p => p.id === projectId)[0]

export const getUserProjects = async () => {
  const user = await getCurrentUser()
  return user.projects
}

export const getProjectFrom = async (timeEntry: TimeEntry) => {
  if (!timeEntry.pid) return undefined
  const projects = await getUserProjects()
  return getProjectById(timeEntry.pid, projects)
}

export const getProjectNameFrom = async (timeEntry: TimeEntry) => {
  const project = await getProjectFrom(timeEntry)
  return project ? project.name : ''
}
