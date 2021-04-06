import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkAssignment } from 'model/work-assignment';
import { WorkItem } from 'model/work-item';
import { WorkType } from 'model/work-type';

@Injectable({
    providedIn: 'root',
})
export class WorkService {
    constructor(private http: HttpClient) {}

    async createType(type: WorkType) {
        return await this.http.post('/api/work/type', type).toPromise();
    }

    async getTypes(): Promise<WorkType[]> {
        return await this.http.get<WorkType[]>('/api/work/type').toPromise();
    }

    async createItem(item: WorkItem) {
        await this.http.post('/api/work/item', item).toPromise();
    }

    async getItems(): Promise<WorkItem[]> {
        return await this.http.get<WorkItem[]>('/api/work/item').toPromise();
    }

    async createAssignments(assignments: WorkAssignment[]) {
        await this.http.post('/api/work/assign', assignments).toPromise();
    }

    async getAssignments(): Promise<WorkAssignment[]> {
        return await this.http.get<WorkAssignment[]>('/api/work/assign').toPromise();
    }
}
