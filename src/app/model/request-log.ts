export interface RequestLog {
    id: number;
    user_id: string;
    url: string;
    url_with_query?: string;
    timestamp: string;
    week_start: string;
}
