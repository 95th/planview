import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timesheet, TimesheetView } from 'model/timesheet';
import { Observable } from 'rxjs';
import { toDateString } from 'util/date.util';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
    constructor(private http: HttpClient) {}

    getAllTimesheets(): Observable<TimesheetView[]> {
        return this.http.get<TimesheetView[]>('/api/timesheet/all');
    }

    getTimesheets(weekStartDate: Date): Observable<Timesheet[]> {
        return this.http.get<Timesheet[]>('/api/timesheet', {
            params: {
                weekStartDate: toDateString(weekStartDate),
            },
        });
    }

    saveTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
        return this.http.post<Timesheet[]>('/api/timesheet', timesheets);
    }
}
