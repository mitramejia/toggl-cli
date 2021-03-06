import {Factory} from 'fishery'
import {User} from '../../..'
import {workspace} from './workspace'
import {project} from './project'
import {client} from './client'

export const user = Factory.define<User>(({sequence, associations}) => ({
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
    workspaces: associations.data?.workspaces || workspace.buildList(2),
    projects: associations.data?.projects || project.buildList(5),
    clients: associations.data?.clients || client.buildList(2),
  },
}))
