import {expect} from '@oclif/test'
import {formatProjectName} from '../../../src/utils/time-entry'
import factories from '../../../src/api/factories'
import {joinTimeLabels, TimeLabel} from '../../../src/utils/time-entry'

describe('formats time entries',  () => {
  it('returns empty string if time is 0', () => {
    expect(joinTimeLabels([{amount: 0, label: 'hour'}])).to.eql('')
  })
  it('returns a verbalized time string without hours',  () => {
    const timeLabelsWithoutHours: TimeLabel[] = [
      {amount: 0, label: 'hour'},
      {amount: 2, label: 'minute'},
      {amount: 1, label: 'second'},
    ]
    expect(joinTimeLabels(timeLabelsWithoutHours)).to.eql('2 minutes 1 second')
  })
  it('returns a verbalized time string without minutes',  () => {
    const timeLabelsWithoutMinutes: TimeLabel[] = [
      {amount: 2, label: 'hour'},
      {amount: 0, label: 'minute'},
      {amount: 1, label: 'second'},
    ]
    expect(joinTimeLabels(timeLabelsWithoutMinutes)).to.eql('2 hours 1 second')
  })
  it('returns a verbalized time string without seconds',  () => {
    const timeLabelsWithoutSeconds: TimeLabel[] = [
      {amount: 2, label: 'hour'},
      {amount: 2, label: 'minute'},
      {amount: 0, label: 'second'},
    ]
    expect(joinTimeLabels(timeLabelsWithoutSeconds)).to.eql('2 hours 2 minutes')
  })
  it('returns a verbalized time string with singular values',  () => {
    const timeLabelsWithoutSeconds: TimeLabel[] = [
      {amount: 1, label: 'hour'},
      {amount: 1, label: 'minute'},
      {amount: 1, label: 'second'},
    ]
    expect(joinTimeLabels(timeLabelsWithoutSeconds)).to.eql('1 hour 1 minute 1 second')
  })
})

describe('Returns a Project UTF-8 color code followed by it\'s name', () => {
  const whiteProject = factories.project.build({hex_color: '#ffffff'})
  expect(formatProjectName(whiteProject)).to.eql('\nAccounting')
})

