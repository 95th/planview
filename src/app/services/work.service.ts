import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkItem } from '../model/work-item';
import { WorkType } from '../model/work-type';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(private http: HttpClient) {}

  async createType(type: WorkType) {
    return this.http.post('/api/work-type', type).toPromise();
  }

  async getTypes(): Promise<WorkType[]> {
    return this.http.get<WorkType[]>('/api/work-type').toPromise();
  }

  async createItem(item: WorkItem) {
    return this.http.post('/api/work-item', item).toPromise();
  }
}
