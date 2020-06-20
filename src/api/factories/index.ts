import {Factory, register} from 'fishery'
import {Client, Project, TimeEntry, TimeEntryResponse, User} from '../types'
import {StartCommandAnswers} from '../../commands/entry/start'

const user = Factory.define<User>(({sequence, factories}) => ({
  since: 3213,
  data: {
    id: sequence,
    api_token: 'ffadsfadsfadsfsdfasdfasdfgdsg',
    default_wid: 3767616,
    email: 'mitra.mejia@gmail.com',
    fullname: 'Mitra Mejia',
    jquery_timeofday_format: 'h:i A',
    jquery_date_format: 'm/d/Y',
    timeofday_format: 'h:mm A',
    date_format: 'MM/DD/YYYY',
    store_start_and_stop_time: true,
    beginning_of_week: 1,
    language: 'en_US',
    image_url: 'https://assets.toggl.com/images/profile.png',
    sidebar_piechart: true,
    at: '2020-04-12T18:52:54+00:00',
    created_at: '2018-04-16T20:25:21+00:00',
    retention: 9,
    record_timeline: true,
    timeline_enabled: true,
    timeline_experiment: false,
    new_blog_post: {},
    should_upgrade: false,
    achievements_enabled: true,
    timezone: 'America/Santo_Domingo',
    openid_enabled: true,
    openid_email: 'mitra.mejia@gmail.com',
    send_product_emails: true,
    send_weekly_report: true,
    send_timer_notifications: true,
    last_blog_entry: '',
    invitation: {},
    tags: [],
    tasks: [],
    duration_format: 'improved',
    workspaces: factories.workspace.buildList(2),
    projects: factories.project.buildList(5),
    clients: factories.client.buildList(2),
  },
}))

interface Workspace {
    id: number;
    name: string;
    profile: number;
    premium: boolean;
    admin: boolean;
    default_currency: string;
    only_admins_may_create_projects: boolean;
    only_admins_see_billable_rates: boolean;
    only_admins_see_team_dashboard: boolean;
    projects_billable_by_default: boolean;
    rounding: number;
    rounding_minutes: number;
    at: string;
    logo_url: string;
    ical_url: string;
    ical_enabled: boolean;
    csv_upload: { log_id: number; at: string };
}

const workspace = Factory.define<Workspace>(({sequence}) => ({
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

const client = Factory.define<Client>(({sequence}) => ({
  id: sequence,
  wid: sequence,
  name: 'ZipBuy',
  at: '2020-06-01T18:58:31+00:00',
}))

const project = Factory.define<Project>(({sequence}) => ({
  id: sequence,
  name: 'Accounting',
  color: 'green',
  active: true,
  billable: false,
  wid: sequence, // workspace ID
  at: '2020-06-01T18:58:31+00:00',
}))

const timeEntry = Factory.define<TimeEntry>(({sequence}) => ({
  id: sequence + 1, description: 'Test desc',
  billable: false,
  duration: 423141234,
  pid: sequence,
  start: '2013-03-05T07:58:58.000Z',
  tags: [],
  wid: sequence,
}))

const startCommandAnswers = Factory.define<StartCommandAnswers>(({factories}) => {
  const project = factories.project.build()
  return {
    selectedProject: project.name,
    timeEntryDesc: factories.timeEntry.build({pid: project.id}).description,
  }
})

const timeEntryResponse = Factory.define<TimeEntryResponse>(({factories}) => ({
  data: factories.timeEntry.build(),
}))

const factories = register({
  user, workspace, startCommandAnswers,
  project,
  client,
  timeEntry, timeEntryResponse,
})

export default factories
