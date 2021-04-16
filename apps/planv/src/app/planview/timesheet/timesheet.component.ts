import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Timesheet } from 'model/timesheet';
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

    async reload() {
        this.loading = true;

        const now = new Date();
        const start = this.dateRange.start || now;
        this.timesheets = await this.timesheetService.getTimesheets(start);
        const assignments = await this.workService.getAssignments();

        for (const assignment of assignments) {
            if (this.timesheets.findIndex((t) => t.assignment.workItem.id === assignment.workItem.id) !== -1) {
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
        }
        this.loading = false;
    }

    async saveTimesheet() {
        this.timesheets = await this.timesheetService.saveTimesheets(this.timesheets);
        this.snackbar.open('Timesheet saved', 'Dismiss', { duration: 2000 });
    }

    private getCurrentWeek(): DateRange<Date> {
        const date = new Date();
        const day = this.dateAdapter.getDayOfWeek(date);
        const start = this.dateAdapter.addCalendarDays(date, 1 - day);
        const end = this.dateAdapter.addCalendarDays(start, 4);
        return new DateRange(start, end);
    }
}
