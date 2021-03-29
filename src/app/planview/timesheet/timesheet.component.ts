import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';

@Component({
    selector: 'pv-timesheet',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
    form: FormGroup;
    dateRange: DateRange<Date>;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({});
    }

    ngOnInit(): void {}
}
