import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkAssignment } from 'model/work-assignment';
import { WorkItem } from 'model/work-item';
import { WorkType } from 'model/work-type';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class WorkService {
    constructor(private http: HttpClient, private auth: AuthService) {}

    async createType(type: WorkType) {
        return await this.http.post('/api/work-type', type).toPromise();
    }

    async getTypes(): Promise<WorkType[]> {
        return await this.http.get<WorkType[]>('/api/work-type').toPromise();
    }

    async createItem(item: WorkItem) {
        return await this.http.post('/api/work-item', item).toPromise();
    }

    async getItems(): Promise<WorkItem[]> {
        return await this.http.get<WorkItem[]>('/api/work-item').toPromise();
    }

    async createAssignments(assignments: WorkAssignment[]) {
        for (const a of assignments) {
            await this.createAssignment(a);
        }
    }

    async createAssignment(assignment: WorkAssignment) {
        if (await this.findAssignment(assignment)) {
            // Don't create duplicate assignments (Should be in the backend but whatever)
            return;
        }

        await this.http.post('/api/work-assignment', assignment).toPromise();
    }

    async getAssignedItems(): Promise<WorkAssignment[]> {
        return await this.http
            .get<WorkAssignment[]>('/api/work-assignment', {
                params: {
                    user_id: this.auth.username,
                },
            })
            .toPromise();
    }

    private async findAssignment(assignment: WorkAssignment): Promise<boolean> {
        const val = await this.http
            .get<WorkAssignment[]>('/api/work-assignment', {
                params: {
                    user_id: assignment.user_id,
                    work_item_id: assignment.work_item_id,
                },
            })
            .toPromise();
        return val.length > 0;
    }
}
