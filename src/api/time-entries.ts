import axios, {AxiosResponse} from 'axios'
import {getTogglApiUrl, getUserAuth} from './auth'

export const paths = {
  start: '/time_entries/start',
}

interface StartTimeEntryRequest {
    pid: number;
    description: string;
    tags?: string[];
    created_with?: string;
}

interface TimeEntry {
    id: number;
    pid: number;
    wid: number;
    billable: boolean;
    start: string;
    duration: number;
    description: string;
    tags?: string[];
    created_with?: string;
}

export const createTimeEntry = async ({description, pid, tags = [], created_with = 'toggl-cli'}: StartTimeEntryRequest) => {
  const auth = getUserAuth()
  const response = await axios.post<StartTimeEntryRequest, AxiosResponse<{data: TimeEntry}>>(
    getTogglApiUrl(paths.start),
    {time_entry: {description, pid, tags, created_with}},
    {auth}
  )
  return response.data.data
}

