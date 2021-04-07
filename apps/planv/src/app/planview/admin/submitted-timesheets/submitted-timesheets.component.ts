import { Component } from '@angular/core';
import { TimesheetView } from 'model/timesheet';
import { TimesheetService } from 'services/timesheet.service';

@Component({
    selector: 'planv-submitted-timesheets',
    templateUrl: './submitted-timesheets.component.html',
    styleUrls: ['./submitted-timesheets.component.scss'],
})
export class SubmittedTimesheetsComponent {
    timesheets: TimesheetView[] = [];
    readonly displayedColumns: string[] = ['name', 'workItemName', 'weekStartDate', 'lastUpdated'];
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
