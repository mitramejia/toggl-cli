import {register} from 'fishery'
import {user} from './user'
import {workspace} from './workspace'
import {client} from './client'
import {project} from './project'
import {timeEntry, timeEntryResponse, timeEntryWithoutProject} from './time-entry'

const factories = register({
  user,
  workspace,
  project,
  client,
  timeEntry,
  timeEntryWithoutProject,
  timeEntryResponse,
})

export default factories
