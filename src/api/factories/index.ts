import {register} from 'fishery'
import {user} from './user'
import {workspace} from './workspace'
import {client} from './client'
import {project} from './project'
import {startCommandAnswers, timeEntry, timeEntryResponse} from './time-entry'

const factories = register({
  user,
  workspace,
  project,
  client,
  startCommandAnswers,
  timeEntry,
  timeEntryResponse,
})

export default factories
