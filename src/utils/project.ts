
import {Project} from '../..'

export const getProjectIdByName = (name: Project['name'], projects: Project[]) => projects.filter(p => p.name === name)[0].id

export const getProjectById = (projectId: Project['id'], projects: Project[]) => projects.filter(p => p.id === projectId)[0]
