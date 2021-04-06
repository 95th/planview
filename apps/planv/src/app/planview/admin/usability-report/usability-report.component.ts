import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { ApiLogAggregate } from 'model/api-log';
import { LoggingService } from 'services/logging.service';

@Component({
    selector: 'planv-usability-report',
    templateUrl: './usability-report.component.html',
    styleUrls: ['./usability-report.component.scss'],
})
export class UsabilityReportComponent {
    dateRange: DateRange<Date>;
    loading = false;
    logs: ApiLogAggregate[] = [];

    displayedColumns: string[] = ['userName', 'url', 'count'];

    constructor(private dateAdapter: DateAdapter<Date>, private logService: LoggingService) {
        this.dateRange = this.getCurrentWeek();
        this.reload();
    }

    async reload() {
        this.loading = true;
        const weekStart = this.dateRange.start || new Date();
        const weekEnd = this.dateAdapter.addCalendarDays(weekStart, 4);
        this.logs = await this.logService.getLogs(weekStart, weekEnd);
        this.loading = false;
    }

    private getCurrentWeek(): DateRange<Date> {
        const date = new Date();
        const day = this.dateAdapter.getDayOfWeek(date);
        const start = this.dateAdapter.addCalendarDays(date, 1 - day);
        const end = this.dateAdapter.addCalendarDays(start, 4);
        return new DateRange(start, end);
    }
}
