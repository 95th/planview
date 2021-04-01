import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timesheet } from 'model/timesheet';
import { dateToString } from 'util/date.util';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
    constructor(private http: HttpClient, private auth: AuthService) {}

    async getAllTimesheets(): Promise<Timesheet[]> {
        return await this.http.get<Timesheet[]>('/api/timesheet').toPromise();
    }

    async getTimesheet(week_start_date: Date): Promise<Timesheet> {
        const timesheets = await this.http
            .get<Timesheet[]>('/api/timesheet', {
                params: {
                    user_id: this.auth.username,
                    week_start_date: dateToString(week_start_date),
                },
            })
            .toPromise();

        if (timesheets && timesheets.length) {
            return timesheets[0];
        }

        return {
            id: 0,
            user_id: this.auth.username,
            week_start_date: dateToString(week_start_date),
            data: [],
        };
    }

    async saveTimesheet(timesheet: Timesheet): Promise<Timesheet> {
        if (timesheet.id === 0) {
            return await this.http.post<Timesheet>('/api/timesheet', timesheet).toPromise();
        } else {
            return await this.http.put<Timesheet>(`/api/timesheet/${timesheet.id}`, timesheet).toPromise();
        }
    }
}
