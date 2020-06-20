import {yellow} from 'chalk'

export const TOGGL_API_URL = process.env.TOGGL_API_URL ?? 'https://www.toggl.com/api/v8'
export const TOGGL_API_TOKEN_URL = 'https://www.toggl.com/app/profile'
export const TOGGL_API_TOKEN_NOT_SET_ERROR = yellow(`TOGGL_API_TOKEN env variable is not set. \nYou can find your Toggl API Token at ${TOGGL_API_TOKEN_URL}`)

export enum Commands {
    EntryStart = 'entry:start',
    EntryStop = 'entry:stop',
}
