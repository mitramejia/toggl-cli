import {Factory} from 'fishery'

export const workspace = Factory.define<Workspace>(({sequence}) => ({
  id: sequence,
  name: 'LeafBuyer Texting & Loyalty Platform (LBLP)',
  profile: 100,
  premium: true,
  admin: false,
  default_currency: 'USD',
  only_admins_may_create_projects: true,
  only_admins_see_billable_rates: true,
  only_admins_see_team_dashboard: false,
  projects_billable_by_default: true,
  rounding: 1,
  rounding_minutes: 0,
  at: '2020-02-15T02:37:56+00:00',
  logo_url: 'https://assets.toggl.com/logos/7e6f3ef03ac3694dd8afb1dba9ab3046.png',
  ical_url: '/ical/workspace_user/6b00fa9ec8b4682149927ef4968214c4',
  ical_enabled: true,
  csv_upload: {
    at: '2019-07-25 19:50:00.086322+00',
    log_id: 4162782,
  },
}))
