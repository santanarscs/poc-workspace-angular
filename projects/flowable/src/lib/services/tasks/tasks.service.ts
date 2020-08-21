import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const url = '/api/flowable-task/process-api/runtime/tasks';
    const sort = 'createTime';
    const order = 'desc';
    const params = new HttpParams().set('sort', sort).set('order', order);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('admin:test')}`,
      }),
      params,
    };
    return this.http.get<any>(url, httpOptions).pipe(
      tap(() => {
        console.log('Taskservice completed');
      })
    );
  }
  getForm(taskId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('admin:test')}`,
      }),
      params: null,
    };
    return this.http
      .get<any>(
        `/api/flowable-task/process-api/runtime/tasks/${taskId}/form`,
        httpOptions
      )
      .toPromise();
  }

  getFormParameters(processDefinitionId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('admin:test')}`,
      }),
      params: null,
    };
    return this.http
      .get(
        `/api/flowable-task/process-api/repository/process-definitions/${processDefinitionId}/form-definitions`,
        httpOptions
      )
      .toPromise();
  }

  async getFormItems(formDefinitionId: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('admin:test')}`,
      }),
      params: null,
    };
    return this.http
      .get(
        `/api/flowable-task/form-api/form-repository/form-definitions/${formDefinitionId}/model`,
        httpOptions
      )
      .toPromise();
  }
}
// /flowable-task/form-api/form-repository/form-definitions/c5bdb1a1-06f8-11e9-a85e-0242ac110002/model'
