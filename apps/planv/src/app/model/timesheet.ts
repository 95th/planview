import { WorkAssignment } from './work-assignment';

export interface Timesheet {
    id: number;
    assignment: WorkAssignment;
    weekStartDate: string;
    hoursMonday: number;
    hoursTuesday: number;
    hoursWednesday: number;
    hoursThursday: number;
    hoursFriday: number;
}
