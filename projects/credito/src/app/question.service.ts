import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get('/api/flowable-task/process-api/runtime/tasks');
  }

  getDataForm(): Observable<any> {
    return this.http.get(
      '/api/flowable-task/form-api/form-repository/form-definitions/608f6953-e30e-11ea-9ed7-0242ac110002/model'
    );
  }
}
