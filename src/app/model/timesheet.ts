export interface Timesheet {
    user_id: string;
    week_start_date: string;
    data: TimesheetRecord[];
}

export interface TimesheetRecord {
    work_item_id: number;

    // Logged hours
    [date: string]: number | null;
}
