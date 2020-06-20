import axios from 'axios'
import {getTogglApiUrl, getUserAuth} from './auth'
import {TimeEntry, TimeEntryResponse} from './types'

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

interface StartTimeEntryRequest {
    pid: number;
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

