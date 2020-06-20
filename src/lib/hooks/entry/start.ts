import {Hook} from '@oclif/config'
import * as fs from 'fs-extra'
import * as path from 'path'
import {disableUrls} from '../../../url-blocker'
import {yellow} from 'chalk'

const start: Hook<'init'> = async function (options) {
  try {
    const userConfig = await fs.readJSON(path.join(options.config.configDir, 'config.json'))
    const bannedUrls: string[] = userConfig.bannedUrls
    disableUrls(bannedUrls)
    this.log('Banned urls disabled')
  } catch (error) {
    this.error(yellow(`${error.message}\nRunning hook ${options.id}`))
  }
}

export default start
