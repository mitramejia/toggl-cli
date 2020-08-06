import {Hook} from '@oclif/config'
import {yellow} from 'chalk'

const start: Hook<'init'> = async function (options) {
  try {
    // Run code when start command executes
  } catch (error) {
    this.error(yellow(`${error.message}\nRunning hook ${options.id}`))
  }
}

export default start
