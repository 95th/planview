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

    reload() {
        this.loading = true;
        this.timesheetService.getAllTimesheets().subscribe((timesheets) => {
            this.timesheets = timesheets;
            this.loading = false;
        });
    }
}
