import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';


@Injectable({
  providedIn: 'root',
})
export class TaskServiceTs {
    private apiUrl = 'http://localhost:5222/tasks'

    constructor(private http: HttpClient){}

    getTasks(): Observable<TaskModel[]> {
      return this.http.get<TaskModel[]>(this.apiUrl)
    }
}
