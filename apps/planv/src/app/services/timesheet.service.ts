import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timesheet, TimesheetView } from 'model/timesheet';
import { toDateString } from 'util/date.util';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
    constructor(private http: HttpClient) {}

    async getAllTimesheets(): Promise<TimesheetView[]> {
        return await this.http.get<TimesheetView[]>('/api/timesheet/all').toPromise();
    }

    async getTimesheets(weekStartDate: Date): Promise<Timesheet[]> {
        return await this.http
            .get<Timesheet[]>('/api/timesheet', {
                params: {
                    weekStartDate: toDateString(weekStartDate),
                },
            })
            .toPromise();
    }

    async saveTimesheets(timesheets: Timesheet[]): Promise<Timesheet[]> {
        return await this.http.post<Timesheet[]>('/api/timesheet', timesheets).toPromise();
    }
}
