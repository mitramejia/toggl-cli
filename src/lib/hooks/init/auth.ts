import {Hook} from '@oclif/config'
import {getUserAuth} from '../../../api/user'

const auth: Hook<'init'> =  async () => {
  getUserAuth()
}

export default auth
