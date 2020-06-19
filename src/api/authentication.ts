import axios from 'axios'
import {User} from './types'
import {isUndefined} from 'lodash'
import {TOGGL_API_TOKEN_URL, TOGGL_API_URL} from './constants'

export const getTogglApiUrl = (path = '') => `${TOGGL_API_URL}${path}`

export const getUserAuth = () => {
  const apiToken = process.env.TOGGL_API_TOKEN

  if (isUndefined(apiToken))
    throw new Error(
      `TOGGL_API_TOKEN env variable is not set. You can find your Toggl API Token at ${TOGGL_API_TOKEN_URL}`
    )

  return {
    username: apiToken,
    password: 'api_token',
  }
}

export const paths = {
  sessions: '/sessions',
  me: '/me',
}

export const getCurrentUser = async () => {
  const auth = getUserAuth()
  const response = await axios.get<User>(getTogglApiUrl(paths.me), {auth, params: {with_related_data: true}})
  return response.data.data
}

export const destroyCurrentSession = async () => {
  const auth = getUserAuth()
  await axios.get<User>(getTogglApiUrl(paths.sessions), {auth})
}

export const getUserProjects = async () => {
  const user = await getCurrentUser()
  return user.projects
}
