import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';


@Injectable({
  providedIn: 'root',
})
export class TaskServiceTs {
    //Url Base definida no backend.http e Controllers
    private apiUrl = 'http://localhost:5222/api/task'

    constructor(private http: HttpClient){}

    //GET ALL
    getTasks(): Observable<TaskModel[]> {
      return this.http.get<TaskModel[]>(this.apiUrl)
    }

    //GET BY ID
    getTask(id : number): Observable<TaskModel> {
      return this.http.get<TaskModel>(`${this.apiUrl}/${id}`)
    }

    //CREATE
    createTask(body: {titulo:string,descricao:string}) : Observable<TaskModel> {
      return this.http.post<TaskModel>(this.apiUrl, body)
    }

    //UPDATE
    updateTask(id:number, body: Partial<TaskModel>): Observable<TaskModel> {
      return this.http.post<TaskModel>(`${this.apiUrl}/${id}`, body)
    }

    //DELETE
    deleteTask(id:number) : Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}
