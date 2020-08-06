import axios from 'axios'
import {getTogglApiUrl, getUserAuth} from './user'
import {TimeEntry, TimeEntryResponse} from '../..'
import {add, floor, flow, multiply} from 'lodash/fp'
import {toDate} from 'date-fns/fp'

export const paths = {
  start: '/time_entries/start',
  current: '/time_entries/current',
  stop: (timeEntryId: number) => `/time_entries/${timeEntryId}/stop`,
}

export const getCurrentTimeEntry = async (): Promise<TimeEntry> => {
  const auth = getUserAuth()
  const response = await axios.get<TimeEntryResponse>(
    getTogglApiUrl(paths.current),
    {auth}
  )
  return response.data.data
}

export interface StartTimeEntryRequest {
    pid?: number;
    description: string;
    tags?: string[];
    created_with?: string;
}

export const startTimeEntry = async ({description, pid, tags = [], created_with = 'toggl-cli'}: StartTimeEntryRequest): Promise<TimeEntry> => {
  const auth = getUserAuth()
  const response = await axios.post<TimeEntryResponse>(
    getTogglApiUrl(paths.start),
    {time_entry: {description, pid, tags, created_with}},
    {auth}
  )
  return response.data.data
}

export const stopTimeEntry = async (id: number): Promise<TimeEntry> => {
  const auth = getUserAuth()

  const response = await axios.put<TimeEntryResponse>(
    getTogglApiUrl(paths.stop(id)),
    {},
    {auth}
  )
  return response.data.data
}

export const secondsSinceEpoch = () => floor(Date.now() / 1000)
export const toMilliseconds = multiply(1000)
// If the time entry is currently running, the duration attribute contains a negative value, denoting the start of the time entry in seconds since epoch (Jan 1 1970). The correct duration can be calculated as current_time + duration, where current_time is the current time in seconds since epoch. (integer, required)
// https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#time-entries
export const extractDateFromDuration = flow(
  add(secondsSinceEpoch()),
  toMilliseconds,
  toDate,
)
