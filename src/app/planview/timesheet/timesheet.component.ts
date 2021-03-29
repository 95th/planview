import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { WeekSelectionStrategy } from 'src/app/services/week-selection.strategy';

@Component({
  selector: 'pv-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekSelectionStrategy,
    },
  ],
})
export class TimesheetComponent implements OnInit {
  form: FormGroup;
  start: Date;
  end: Date;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.form = this.fb.group({});
    this.setDateRange(new Date());
  }

  ngOnInit(): void {}

  rangeFilter(date: Date | null): boolean {
    const day = (date || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  printDate() {
    console.log(this.start, this.end);
  }

  private setDateRange(date: Date) {
    const day = this.dateAdapter.getDayOfWeek(date);
    this.start = this.dateAdapter.addCalendarDays(date, 1 - day);
    this.end = this.dateAdapter.addCalendarDays(this.start, 4);
  }

  selectNextWeek() {
    this.start = this.dateAdapter.addCalendarDays(this.start, 7);
    this.end = this.dateAdapter.addCalendarDays(this.end, 7);
  }

  selectPreviousWeek() {
    this.start = this.dateAdapter.addCalendarDays(this.start, -7);
    this.end = this.dateAdapter.addCalendarDays(this.end, -7);
  }
}
