import {register} from 'fishery'
import {user} from './user'
import {workspace} from './workspace'
import {client} from './client'
import {project} from './project'
import {startCommandAnswers, timeEntry, timeEntryResponse} from './timeEntry'

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
