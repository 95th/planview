import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLog, ApiLogAggregate } from 'model/api-log';
import { dateToString } from 'util/date.util';

@Injectable({ providedIn: 'root' })
export class LoggingService {
    constructor(private http: HttpClient) {}

    async logRequest(url: string, queryUrl: string) {
        const data: ApiLog = {
            id: 0,
            userId: 0,
            url,
            queryUrl: url === queryUrl ? undefined : queryUrl,
            timestamp: new Date().toISOString(),
        };
        await this.http.post('/api/log', data).toPromise();
    }

    async getLogs(weekStart: Date, weekEnd: Date): Promise<ApiLogAggregate[]> {
        return await this.http
            .get<ApiLogAggregate[]>('/api/log/aggregate', {
                params: {
                    startDate: dateToString(weekStart),
                    endDate: dateToString(weekEnd),
                },
            })
            .toPromise();
    }
}
