import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskServiceTs } from '../../../services/task.service.ts';
import { TaskModel } from '../../../models/task.model.js';

@Component({
  selector: 'app-list.task.component',
  imports: [CommonModule,RouterModule],
  standalone:true,
  templateUrl: './list.task.component.html',
  styleUrl: './list.task.component.css',
})
export class ListTaskComponent implements OnInit {

  tasks: TaskModel[] = []

  constructor(private service: TaskServiceTs){}

  ngOnInit(): void {
    this.loadTask()
  }

  loadTask(){
    this.service.getTasks().subscribe({
      next: (res) => {
          this.tasks = res
        },
      error: (err) => {
          console.error('erro ao carregar tarefas:', err)
        }
      })
  }

  getByStatus(status: string){
    this.tasks.filter((s) => s.Status === status )
  }

  deleteTask(id:number){
    this.service.deleteTask(id).subscribe({
      next: () => {
        this.loadTask()
        console.log("Sucesso ao Deletar!") // apenas para modo dev
      },
      error: (err) => {
        console.error("Erro ao deletar", err)
      }
    })
  }


}
