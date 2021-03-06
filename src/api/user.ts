import axios from 'axios'
import {isUndefined} from 'lodash'
import {TOGGL_API_TOKEN_NOT_SET_ERROR, TOGGL_API_URL} from './constants'
import {CLIError} from '@oclif/errors'
import {User} from '../..'

export const paths = {
  sessions: '/sessions',
  me: '/me?with_related_data=true',
}

export const getUserAuth = () => {
  const apiToken = process.env.TOGGL_API_TOKEN

  if (isUndefined(apiToken)) {
    throw new CLIError(TOGGL_API_TOKEN_NOT_SET_ERROR)
  }

  return {
    username: apiToken,
    password: 'api_token',
  }
}

export const getTogglApiUrl = (path = '') => `${TOGGL_API_URL}${path}`

export const getCurrentUser = async () => {
  const auth = getUserAuth()
  const response = await axios.get<User>(getTogglApiUrl(paths.me), {auth})
  return response.data.data
}

