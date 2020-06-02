import {Command} from '@oclif/command'
import {getCurrentUser} from '../lib/api/authentication'

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

    async run() {
      try {
        const {fullname, email}  = await getCurrentUser()
        this.log(`Logged in as ${fullname} (${email})`)
      } catch (error) {
        this.error(`${error.message}`)
      }
    }
}

