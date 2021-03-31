import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { RequestLog } from 'src/app/model/request-log';
import { LoggingService } from 'src/app/services/logging.service';

interface RequestLogAggregate {
    user_id: string;
    url: string;
    count: number;
}

@Component({
    selector: 'pv-usability-report',
    templateUrl: './usability-report.component.html',
    styleUrls: ['./usability-report.component.scss'],
})
export class UsabilityReportComponent {
    dateRange: DateRange<Date>;
    loading: boolean = false;
    logs: RequestLogAggregate[] = [];

    displayedColumns: string[] = ['user_id', 'url', 'count'];

    constructor(private dateAdapter: DateAdapter<Date>, private logService: LoggingService) {
        this.dateRange = this.getCurrentWeek();
        this.reload();
    }

    async reload() {
        this.loading = true;
        const weekStart = this.dateRange.start || new Date();
        this.logs = await this.logService.getRequestLogsAggregate(weekStart);
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
