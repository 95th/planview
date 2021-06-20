import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLog } from 'model/api-log';
import { Observable } from 'rxjs';
import { toDatetimeString } from 'util/date.util';

@Injectable({ providedIn: 'root' })
export class LoggingService {
    constructor(private http: HttpClient) {}

    getLogs(weekStart: Date, weekEnd: Date): Observable<ApiLog[]> {
        return this.http.get<ApiLog[]>('/api/log/aggregate', {
            params: {
                startDate: toDatetimeString(weekStart),
                endDate: toDatetimeString(weekEnd),
            },
        });
    }
}
