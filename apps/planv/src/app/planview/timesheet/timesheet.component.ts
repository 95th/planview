import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Timesheet, TimesheetRecord } from 'model/timesheet';
import { TimesheetService } from 'services/timesheet.service';
import { WorkService } from 'services/work.service';
import { dateToString } from 'util/date.util';

@Component({
    selector: 'planv-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
    dateRange: DateRange<Date>;
    loading = false;

    timesheet: Timesheet = {
        id: 0,
        user_id: '',
        week_start_date: '',
        data: [],
    };
    columns: string[] = [];
    displayedColumns: string[] = [];

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
        const start = this.dateRange.start || new Date();
        this.columns = [];
        for (let i = 0; i < 5; i++) {
            const d = this.dateAdapter.addCalendarDays(start, i);
            this.columns.push(dateToString(d));
        }
        this.displayedColumns = ['work_item_name', ...this.columns];

        this.timesheet = await this.timesheetService.getTimesheet(start);
        const assignedItems = await this.workService.getAssignedItems();

        for (const assignedItem of assignedItems) {
            if (this.timesheet.data.findIndex((record) => record.work_item_id === assignedItem.work_item_id) !== -1) {
                continue;
            }

            const obj: TimesheetRecord = {
                work_item_id: assignedItem.work_item_id,
            };

            for (const col of this.columns) {
                obj[col] = 0;
            }

            this.timesheet.data.push(obj);
        }
        this.loading = false;
    }

    async saveTimesheet() {
        this.timesheet = await this.timesheetService.saveTimesheet(this.timesheet);
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
