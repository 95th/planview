import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
    DateRange,
    MatDateRangeSelectionStrategy,
    MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Injectable()
export class WeekSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
    constructor(private _dateAdapter: DateAdapter<D>) {}

    selectionFinished(date: D | null): DateRange<D> {
        return this._createFiveDayRange(date);
    }

    createPreview(activeDate: D | null): DateRange<D> {
        return this._createFiveDayRange(activeDate);
    }

    private _createFiveDayRange(date: D | null): DateRange<D> {
        if (date) {
            const day = this._dateAdapter.getDayOfWeek(date);
            const start = this._dateAdapter.addCalendarDays(date, 1 - day);
            const end = this._dateAdapter.addCalendarDays(start, 4);
            return new DateRange<D>(start, end);
        }

        return new DateRange<D>(null, null);
    }
}

@Component({
    selector: 'pv-week-selector',
    templateUrl: './week-selector.component.html',
    styleUrls: ['./week-selector.component.scss'],
    providers: [
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: WeekSelectionStrategy,
        },
    ],
})
export class WeekSelectorComponent implements OnInit {
    @Input() week: DateRange<Date>;
    @Output() weekChange = new EventEmitter<DateRange<Date>>();
    start: Date;
    end: Date;

    constructor(private dateAdapter: DateAdapter<Date>) {
        this.setDateRange(this.dateAdapter.today());
    }

    ngOnInit(): void {}

    rangeFilter(date: Date | null): boolean {
        const day = (date || new Date()).getDay();
        return day !== 0 && day !== 6;
    }

    onDateChange() {
        this.weekChange.emit(new DateRange(this.start, this.end));
    }

    private setDateRange(date: Date) {
        const day = this.dateAdapter.getDayOfWeek(date);
        this.start = this.dateAdapter.addCalendarDays(date, 1 - day);
        this.end = this.dateAdapter.addCalendarDays(this.start, 4);
    }

    addWeek(week: number) {
        this.start = this.dateAdapter.addCalendarDays(this.start, week * 7);
        this.end = this.dateAdapter.addCalendarDays(this.end, week * 7);
    }
}
