import { Component } from '@angular/core';
import { Timesheet } from 'model/timesheet';
import { TimesheetService } from 'services/timesheet.service';

@Component({
    selector: 'planv-submitted-timesheets',
    templateUrl: './submitted-timesheets.component.html',
    styleUrls: ['./submitted-timesheets.component.scss'],
})
export class SubmittedTimesheetsComponent {
    timesheets: Timesheet[] = [];
    displayedColumns: string[] = ['name', 'week_start'];
    loading = false;

    constructor(private timesheetService: TimesheetService) {
        this.reload();
    }

    async reload() {
        this.loading = true;
        this.timesheets = await this.timesheetService.getAllTimesheets();
        this.loading = false;
    }
}
