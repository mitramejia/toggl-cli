import {Commands, TOGGL_API_TOKEN_NOT_SET_ERROR} from '../src/api/constants'
import {test} from '@oclif/test'

describe('Auth', () => {
  test
  .stderr()
  .env({TOGGL_API_TOKEN: undefined})
  .command([Commands.EntryStart])
  .catch(TOGGL_API_TOKEN_NOT_SET_ERROR)
  .it('errors if TOGGL_API_TOKEN is not set')
})
