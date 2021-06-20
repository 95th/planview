import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkAssignment } from 'model/work-assignment';
import { WorkItem } from 'model/work-item';
import { WorkType } from 'model/work-type';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WorkService {
    constructor(private http: HttpClient) {}

    createType(type: WorkType): Observable<void> {
        return this.http.post<void>('/api/work/type', type);
    }

    getTypes(): Observable<WorkType[]> {
        return this.http.get<WorkType[]>('/api/work/type');
    }

    createItem(item: WorkItem): Observable<void> {
        return this.http.post<void>('/api/work/item', item);
    }

    getItems(): Observable<WorkItem[]> {
        return this.http.get<WorkItem[]>('/api/work/item');
    }

    createAssignments(assignments: WorkAssignment[]): Observable<void> {
        return this.http.post<void>('/api/work/assign', assignments);
    }

    getAssignments(): Observable<WorkAssignment[]> {
        return this.http.get<WorkAssignment[]>('/api/work/assign');
    }
}
