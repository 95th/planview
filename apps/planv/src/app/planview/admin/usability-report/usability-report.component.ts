import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { ApiLog } from 'model/api-log';
import { LoggingService } from 'services/logging.service';

@Component({
    selector: 'planv-usability-report',
    templateUrl: './usability-report.component.html',
    styleUrls: ['./usability-report.component.scss'],
})
export class UsabilityReportComponent {
    dateRange: DateRange<Date>;
    loading = false;
    logs: ApiLog[] = [];

    displayedColumns: string[] = ['userName', 'url', 'count'];

    constructor(private dateAdapter: DateAdapter<Date>, private logService: LoggingService) {
        this.dateRange = this.getCurrentWeek();
        this.reload();
    }

    reload() {
        this.loading = true;
        const weekStart = this.dateRange.start || new Date();
        const weekEnd = this.dateAdapter.addCalendarDays(weekStart, 4);
        this.logService.getLogs(weekStart, weekEnd).subscribe((logs) => {
            this.logs = logs;
            this.loading = false;
        });
    }

    private getCurrentWeek(): DateRange<Date> {
        const date = new Date();
        const day = this.dateAdapter.getDayOfWeek(date);
        const start = this.dateAdapter.addCalendarDays(date, 1 - day);
        const end = this.dateAdapter.addCalendarDays(start, 4);
        return new DateRange(start, end);
    }
}
