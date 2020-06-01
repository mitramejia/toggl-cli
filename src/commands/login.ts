import {Command} from '@oclif/command'
import cli from 'cli-ux'
import {getCurrentUser} from '../lib/api/authentication'
import * as fs from 'fs'
import {TOGGL_CLI_CONFIG_PATH} from '../lib/api/constants'

export default class Login extends Command {
    static strings = {
      description: 'Authenticate to Toggl',
      question: 'What is your toggle api token?',
      suggestion: 'You can get the api token at https://www.toggl.com/app/profile',
    }

    static description = Login.strings.description

    static examples = [
      '$ toggl login ',
    ]

    /*
    Look for `TOGGL_SECRET` env var in `process.env`

    If there's none in `process.env`:  Look for one at `~/.toggl-config`

    If theres none at `~/.toggl-config` : Ask user for them and save them at `~/.toggl-config`

    Every **command** should  `ensureUserIsAuthenticated()`

    *Create an util function that runs every time a command is issued*
     */

    private getSecretFromConfigFile() {
      const data = null
      fs.readFile(TOGGL_CLI_CONFIG_PATH, 'utf8', (error, data) => {
        if (error) this.error(error)
        console.log(data)
      })
      return data
    }

    private async writeSecretToConfigFile(secret: string): void {}

    private async userIsAuthenticated(): boolean {}

    private async ensureUserIsAuthenticated(): void {
      if (!process.env.TOGGL_API_TOKEN) {
        const secretFromConfig = getSecretFromConfigFile()
        const apiToken = await cli.prompt(Login.strings.question, {type: 'hide'})
      }
    }

    private async login(): void {}

    private async logout(): void {}

    async run() {
      this.getSecretFromConfigFile()
      try {
        const {fullname, email}  = await getCurrentUser()
        this.log(`Logged in as ${fullname} (${email})`)
      } catch (error) {
        this.error(`${error.message} \n${Login.strings.suggestion}`)
      }
    }
}

