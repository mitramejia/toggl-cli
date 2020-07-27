import {registerPrompt} from 'inquirer'

// Disable chalk for test
const chalk = require('chalk')
chalk.level = 0

// Load .env variables
require('dotenv').config()

// Register inquirer-search-list plugin
registerPrompt('search-list', require('inquirer-search-list'))
