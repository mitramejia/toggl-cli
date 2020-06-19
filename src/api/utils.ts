import {Project} from './types'

export const getProjectIdByName = (name: string, projects: Project[]) =>
  projects.filter(p => p.name === name)[0].id