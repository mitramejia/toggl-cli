import {Factory} from 'fishery'
import {TimeEntry, TimeEntryResponse} from '../../..'

export const timeEntry = Factory.define<TimeEntry>(({sequence}) => ({
  id: sequence + 1,
  description: 'Test desc',
  billable: false,
  duration: 423141234,
  pid: sequence,
  start: '2013-03-05T07:58:58.000Z',
  tags: [],
  wid: sequence,
}))

export const timeEntryResponse = Factory.define<TimeEntryResponse>(({factories}) => ({
  data: factories.timeEntry.build(),
}))

