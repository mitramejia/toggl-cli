import {Hook} from '@oclif/config'

import {yellow} from 'chalk'

const stop: Hook<'init'> = async function (options) {
  try {
    // Run code when stop command executes
  } catch (error) {
    this.error(yellow(`${error.message}\nRunning hook ${options.id}`))
  }
}

export default stop
