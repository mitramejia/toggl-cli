interface Project {
    wid: number;
    at: string;
    color: string;
    name: string;
    active: boolean;
    id: number;
    billable: boolean;
}

interface Workspace {
    projects_billable_by_default: boolean;
    at: string;
    rounding_minutes: number;
    api_token: string;
    name: string;
    rounding: number;
    id: number;
    default_hourly_rate: number;
    default_currency: string;
}

interface Tag {
    wid: number;
    name: string;
    id: number;
}

export interface User {
    since: number;
    data: {
        projects: Project[];
        clients: any[];
        image_url: string;
        timezone: string;
        api_token: string;
        timeofday_format: string;
        beginning_of_week: number;
        jquery_date_format: string;
        created_at: string;
        language: string;
        default_wid: number;
        store_start_and_stop_time: boolean;
        tags: Tag[];
        at: string;
        new_blog_post: {};
        jquery_timeofday_format: string;
        date_format: string;
        duration_format: string;
        id: number;
        fullname: string;
        workspaces: Workspace[];
        email: string;
        retention: number;
        tasks: any[];
        openid_email?: string;
        sidebar_piechart?: boolean;
        should_upgrade?: boolean;
        record_timeline?: boolean;
        timeline_experiment?: boolean;
        achievements_enabled?: boolean;
        openid_enabled?: boolean;
        timeline_enabled?: boolean;
        send_product_emails?: boolean;
        send_weekly_report?: boolean;
        send_timer_notifications?: boolean;
        last_blog_entry?: string;
        invitation?: {};
    };
}

export interface TimeEntry {
    id: number;
    pid: number;
    wid: number;
    billable: boolean;
    start: string;
    duration: number;
    description: string;
    tags: string[];
}

export interface Client {
    id: number;
    wid: number;
    name: string;
    at: string;
}
