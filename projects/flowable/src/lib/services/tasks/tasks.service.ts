import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, fromEventPattern } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const url = '/api/flowable-task/process-api/runtime/tasks';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('admin:test')}`,
      }),
      params: null,
    };
    return this.http.get<any>(url, httpOptions).pipe(
      tap(() => {
        console.log('Taskservice completed');
      })
    );
  }
}
