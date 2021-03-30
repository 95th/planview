import { Component, OnInit } from '@angular/core';
import { Timesheet } from 'src/app/model/timesheet';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
    selector: 'pv-submitted-timesheets',
    templateUrl: './submitted-timesheets.component.html',
    styleUrls: ['./submitted-timesheets.component.scss'],
})
export class SubmittedTimesheetsComponent {
    timesheets: Timesheet[] = [];
    displayedColumns: string[] = ['name', 'week_start'];
    loading: boolean = false;

    constructor(private timesheetService: TimesheetService) {
        this.reload();
    }

    async reload() {
        this.loading = true;
        this.timesheets = await this.timesheetService.getAllTimesheets();
        this.loading = false;
    }
}
