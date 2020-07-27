import {Factory} from 'fishery'
import {Project} from '../../..'

export const project = Factory.define<Project>(({sequence}) => ({
  id: sequence,
  name: 'Accounting',
  color: 'green',
  active: true,
  billable: false,
  wid: sequence, // workspace ID
  at: '2020-06-01T18:58:31+00:00',
  actual_hours: 20,
  auto_estimates: false,
  created_at: '2020-06-01T18:58:31+00:00',
  hex_color: '#FEFEFE',
}))
