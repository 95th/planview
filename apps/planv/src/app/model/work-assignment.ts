import { WorkItem } from './work-item';

export interface WorkAssignment {
    id: number;
    userId: number;
    workItem: WorkItem;
}
