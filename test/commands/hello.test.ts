import {expect, test} from '@oclif/test'
import Login from '../../src/commands/auth'

describe('auth', () => {
  test
  .stdout()
  .command(['auth'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain(Login.strings.question)
  })
})
