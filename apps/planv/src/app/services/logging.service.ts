import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { RequestLog, RequestLogAggregate } from 'model/request-log';
import { dateToString } from 'util/date.util';
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

    async getRequestLogsAggregate(weekStart: Date): Promise<RequestLogAggregate[]> {
        const logs = await this.getRequestLogs(weekStart);
        return aggregate(logs);
    }
}

function aggregate(logs: RequestLog[]): RequestLogAggregate[] {
    const map = new Map<string, Map<string, number>>();
    for (const log of logs) {
        let requests = map.get(log.user_id);
        if (!requests) {
            requests = new Map<string, number>();
            map.set(log.user_id, requests);
        }

        const count = requests.get(log.url) || 0;
        requests.set(log.url, count + 1);
    }
    const out: RequestLogAggregate[] = [];
    for (const user_id of map.keys()) {
        const requests = map.get(user_id);
        if (!requests) {
            continue;
        }

        for (const url of requests.keys()) {
            const count = requests.get(url) || 0;
            out.push({
                user_id: user_id,
                url,
                count,
            });
        }
    }
    return out;
}
