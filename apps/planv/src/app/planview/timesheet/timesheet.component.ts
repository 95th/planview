import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Timesheet } from 'model/timesheet';
import { WorkAssignment } from 'model/work-assignment';
import { forkJoin } from 'rxjs';
import { TimesheetService } from 'services/timesheet.service';
import { WorkService } from 'services/work.service';
import { toDateString } from 'util/date.util';

@Component({
    selector: 'planv-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
    dateRange: DateRange<Date>;
    loading = false;

    timesheets: Timesheet[] = [];

    readonly columns: { name: string; label: string }[] = [
        { name: 'hoursMonday', label: 'Mon' },
        { name: 'hoursTuesday', label: 'Tue' },
        { name: 'hoursWednesday', label: 'Wed' },
        { name: 'hoursThursday', label: 'Thu' },
        { name: 'hoursFriday', label: 'Fri' },
    ];
    readonly displayedColumns: string[] = [
        'workItemName',
        'hoursMonday',
        'hoursTuesday',
        'hoursWednesday',
        'hoursThursday',
        'hoursFriday',
    ];

    constructor(
        private dateAdapter: DateAdapter<Date>,
        private workService: WorkService,
        private timesheetService: TimesheetService,
        private snackbar: MatSnackBar
    ) {
        this.dateRange = this.getCurrentWeek();
        this.reload();
    }

    reload() {
        this.loading = true;

        const now = new Date();
        const start = this.dateRange.start || now;

        const combined = forkJoin([this.timesheetService.getTimesheets(start), this.workService.getAssignments()]);
        combined.subscribe(([timesheets, assignments]) => {
            this.timesheets = timesheets;
            this.createNewTimesheets(assignments, start, now);
            this.loading = false;
        });
    }

    saveTimesheet() {
        this.timesheetService.saveTimesheets(this.timesheets).subscribe((timesheets) => {
            this.timesheets = timesheets;
            this.snackbar.open('Timesheet saved', 'Dismiss', { duration: 2000 });
        });
    }

    private createNewTimesheets(assignments: WorkAssignment[], start: Date, now: Date) {
        const map = new Map<number, Timesheet>();
        for (const t of this.timesheets) {
            map.set(t.assignment.workItem.id, t);
        }

        for (const assignment of assignments) {
            if (map.get(assignment.workItem.id)) {
                continue;
            }

            const timesheet = {
                id: 0,
                assignment,
                weekStartDate: toDateString(start),
                hoursMonday: 0,
                hoursTuesday: 0,
                hoursWednesday: 0,
                hoursThursday: 0,
                hoursFriday: 0,
                lastUpdated: now.toISOString(),
            };

            this.timesheets.push(timesheet);
            map.set(assignment.workItem.id, timesheet);
        }
    }

    private getCurrentWeek(): DateRange<Date> {
        const date = new Date();
        const day = this.dateAdapter.getDayOfWeek(date);
        const start = this.dateAdapter.addCalendarDays(date, 1 - day);
        const end = this.dateAdapter.addCalendarDays(start, 4);
        return new DateRange(start, end);
    }
}
