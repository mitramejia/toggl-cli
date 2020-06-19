import * as inquirer from 'inquirer'

inquirer.registerPrompt('search-list', require('inquirer-search-list'))
export {run} from '@oclif/command'
