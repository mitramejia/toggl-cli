import {register} from 'fishery'
import {user} from './user'
import {workspace} from './workspace'
import {client} from './client'
import {project} from './project'
import {timeEntry, timeEntryResponse} from './time-entry'

const factories = register({
  user,
  workspace,
  project,
  client,
  timeEntry,
  timeEntryResponse,
})

export default factories
