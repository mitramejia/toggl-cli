import {Hook} from '@oclif/config'
import {getUserAuth} from '../../../api/auth'

const auth: Hook<'init'> =  async () => {
  getUserAuth()
}

export default auth
