export interface Timesheet {
    id: 0;
    user_id: string;
    week_start_date: string;
    data: TimesheetRecord[];
}

export interface TimesheetRecord {
    work_item_id: string;

    // Logged hours
    [date: string]: string | number | null;
}
