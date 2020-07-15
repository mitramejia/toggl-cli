import {registerPrompt} from 'inquirer'

before(async () => {
  require('dotenv').config()
  registerPrompt('search-list', require('inquirer-search-list'))
})
