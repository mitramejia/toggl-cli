import axios from 'axios'
import {User} from './types'
import {isUndefined} from 'lodash'
import {TOGGL_API_URL} from './constants'

const getTogglApiUrl = (path = '') => `${TOGGL_API_URL}/${path}`

const getUserAuth = () => {
  const apiToken = process.env.TOGGL_API_TOKEN

  if (isUndefined(apiToken)) throw new Error('TOGGL_API_TOKEN env variable is not set.')

  return {
    username: apiToken, // 'a01c44d12695009982ef4c1bcf0396bb',
    password: 'api_token',
  }
}

const paths = {
  sessions: 'sessions',
  me: 'me',
}

export const getCurrentUser = async () => {
  const auth = getUserAuth()
  const user = await axios.get<User>(getTogglApiUrl(paths.me), {auth})
  return user.data.data
}

export const destroyCurrentSession = async () => {
  const auth = getUserAuth()
  await axios.get<User>(getTogglApiUrl(paths.sessions), {auth})
}

