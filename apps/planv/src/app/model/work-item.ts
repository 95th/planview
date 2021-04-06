import { WorkType } from './work-type';

export interface WorkItem {
    id: number;
    name: string;
    workType: WorkType;
}
