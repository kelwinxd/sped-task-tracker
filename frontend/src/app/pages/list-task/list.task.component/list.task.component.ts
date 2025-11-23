import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TaskServiceTs } from '../../../services/task.service.ts';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.task.component.html',
  styleUrls: ['./list.task.component.css'],
})
export class ListTaskComponent implements OnInit {

  tasks: TaskModel[] = [];
  pendentes: TaskModel[] = [];
  emAndamento: TaskModel[] = [];
  concluidas: TaskModel[] = [];

  constructor(
    private service: TaskServiceTs,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadTask();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadTask();
      });
  }

  loadTask(): void {
    this.service.getTasks().subscribe({
      //Funcao se der certo
      next: (res) => {
        this.tasks = res;

        //Filtros para segregar a lista na view
        this.pendentes = this.tasks.filter(t => t.status === 'Pendente');
        this.emAndamento = this.tasks.filter(t => t.status === 'Em Andamento');
        this.concluidas = this.tasks.filter(t => t.status === 'Concluído');

        //Faz Atualizar a view
        this.cdr.detectChanges();

        //console.log('tasks carregadas:', this.tasks);
      },

      //Tratamento de erros
      error: (err) => console.error('Erro ao carregar tarefas:', err)
    });
  }

 deleteTask(id: number): void {
  const confirmDelete = window.confirm('Tem certeza que deseja deletar esta tarefa?');
  if (!confirmDelete) return; 

  this.service.deleteTask(id).subscribe({

    //Funcao se Der Certo
    next: () => {
      this.loadTask();
      console.log('Tarefa deletada com sucesso!');
    },

    //Tratamento de erros
    error: (err) => console.error('Erro ao deletar:', err)
  });
}

}
