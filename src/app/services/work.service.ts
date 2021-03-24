import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkType } from '../model/work-type';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(private http: HttpClient) {}

  async createType(type: WorkType) {
    return this.http.post('/api/work-type', type).toPromise();
  }
}
