import {Factory} from 'fishery'

export const client = Factory.define<Client>(({sequence}) => ({
  id: sequence,
  wid: sequence,
  name: 'ZipBuy',
  at: '2020-06-01T18:58:31+00:00',
}))
