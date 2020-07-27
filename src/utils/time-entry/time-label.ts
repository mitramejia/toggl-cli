import {set} from 'lodash'
import {flatten, flow, join, map, propEq, reject, valuesIn} from 'lodash/fp'

export interface TimeLabel {
    amount: number;
    label: 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds';
}

export const dateToTimeLabels = (date: Date): TimeLabel[] => [
  {amount: date.getUTCHours(), label: 'hour'},
  {amount: date.getUTCMinutes(), label: 'minute'},
  {amount: date.getUTCSeconds(), label: 'second'},
]

const pluralize = (amount: number, label: string) => {
  const amountIsZeroOrOne = amount > 1 || amount === 0
  const pluralizedLabel = label + 's'
  return amountIsZeroOrOne ? pluralizedLabel : label
}

export const pluralizeTimeLabel = ({amount, label}: TimeLabel): TimeLabel =>
  set({amount, label}, 'label', pluralize(amount, label))

export const joinTimeLabels = flow(
  reject<TimeLabel>(propEq('amount', 0)),
  map(pluralizeTimeLabel),
  map(valuesIn),
  flatten,
  join(' '),
)

