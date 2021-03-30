import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { RequestLog } from '../model/request-log';
import { dateToString } from '../util/date.util';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LoggingService {
    constructor(private http: HttpClient, private auth: AuthService, private dateAdapter: DateAdapter<Date>) {}

    async logRequest(url: string, url_with_query: string) {
        const date = new Date();
        const dayOfWeek = this.dateAdapter.getDayOfWeek(date);
        const weekStart = this.dateAdapter.addCalendarDays(date, 1 - dayOfWeek);
        const data: RequestLog = {
            id: 0,
            user_id: this.auth.username,
            url,
            url_with_query: url === url_with_query ? undefined : url_with_query,
            timestamp: new Date().toISOString(),
            week_start: dateToString(weekStart),
        };
        await this.http.post('/api/api-log', data).toPromise();
    }

    async getRequestLogs(weekStart: Date): Promise<RequestLog[]> {
        return await this.http
            .get<RequestLog[]>('/api/api-log', {
                params: { week_start: dateToString(weekStart) },
            })
            .toPromise();
    }
}
