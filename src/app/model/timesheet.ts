export interface TimesheetEntry {
    id: number;
    date: string;
    user_id: string;
    assignment_id: number;
    work_item_id: number;
    hour: number;
}
