import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';


@Injectable({
  providedIn: 'root',
})
export class TaskServiceTs {
    private apiUrl = 'http://localhost:5222/api/task'

    constructor(private http: HttpClient){}

    getTasks(): Observable<TaskModel[]> {
      return this.http.get<TaskModel[]>(this.apiUrl)
    }

    getTask(id : number): Observable<TaskModel> {
      return this.http.get<TaskModel>(`${this.apiUrl}/${id}`)
    }

    createTask(body: {titulo:string,descricao:string}) : Observable<TaskModel> {
      return this.http.post<TaskModel>(this.apiUrl, body)
    }

    updateTask(id:number, body: Partial<TaskModel>): Observable<TaskModel> {
      return this.http.post<TaskModel>(`${this.apiUrl}/${id}`, body)
    }

    deleteTask(id:number) : Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
