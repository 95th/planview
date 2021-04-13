import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLog } from 'model/api-log';
import { dateToString } from 'util/date.util';

@Injectable({ providedIn: 'root' })
export class LoggingService {
    constructor(private http: HttpClient) {}

    async getLogs(weekStart: Date, weekEnd: Date): Promise<ApiLog[]> {
        return await this.http
            .get<ApiLog[]>('/api/log/aggregate', {
                params: {
                    startDate: dateToString(weekStart),
                    endDate: dateToString(weekEnd),
                },
            })
            .toPromise();
    }
}
