import {Factory} from 'fishery'
// TODO: Remove, does not belong here because its a static property of a command not an global entity
import {StartCommandAnswers} from '../../commands/entry/start'
import {TimeEntry, TimeEntryResponse} from '../../..'

export const timeEntry = Factory.define<TimeEntry>(({sequence}) => ({
  id: sequence + 1, description: 'Test desc',
  billable: false,
  duration: 423141234,
  pid: sequence,
  start: '2013-03-05T07:58:58.000Z',
  tags: [],
  wid: sequence,
}))

export const startCommandAnswers = Factory.define<StartCommandAnswers>(({factories}) => {
  const project = factories.project.build()
  return {
    selectedProject: project.name,
    timeEntryDesc: factories.timeEntry.build({pid: project.id}).description,
  }
})

export const timeEntryResponse = Factory.define<TimeEntryResponse>(({factories}) => ({
  data: factories.timeEntry.build(),
}))

