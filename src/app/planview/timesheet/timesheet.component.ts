import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { TimesheetEntry } from 'src/app/model/timesheet';
import { WorkService } from 'src/app/services/work.service';

@Component({
    selector: 'pv-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent {
    form: FormGroup;
    dateRange: DateRange<Date>;
    loading: boolean = false;

    entries: TimesheetEntry[] = [
        {
            id: 2,
            user_id: 'vargwin',
            assignment_id: 3,
            date: '2020-01-01',
            hour: 20,
            work_item_id: 1,
        },
    ];
    columns: string[] = [];
    displayedColumns: string[] = [];

    constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>, private workService: WorkService) {
        this.form = this.fb.group({});
        this.dateRange = this.getCurrentWeek();
        this.reload();
    }

    reload() {
        this.columns = [];
        for (let i = 0; i < 5; i++) {
            const d = this.dateAdapter.addCalendarDays(this.dateRange.start || new Date(), i);
            this.columns.push(dateToString(d));
        }
        this.displayedColumns = ['work_item_name', ...this.columns];
    }

    private getCurrentWeek(): DateRange<Date> {
        const date = new Date();
        const day = this.dateAdapter.getDayOfWeek(date);
        const start = this.dateAdapter.addCalendarDays(date, 1 - day);
        const end = this.dateAdapter.addCalendarDays(start, 4);
        return new DateRange(start, end);
    }
}

const MONTHS: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function dateToString(date: Date): string {
    let d = date.getDate().toString();
    if (d.length === 1) {
        d = '0' + d;
    }
    return d + '-' + MONTHS[date.getMonth()] + '-' + date.getFullYear();
}
