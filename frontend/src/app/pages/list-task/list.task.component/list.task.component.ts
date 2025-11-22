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
      next: (res) => {
        this.tasks = res;
        this.pendentes = this.tasks.filter(t => t.status === 'Pendente');
        this.emAndamento = this.tasks.filter(t => t.status === 'Em Andamento');
        this.concluidas = this.tasks.filter(t => t.status === 'Concluído');

        // faz o Angular a atualizar a view
        this.cdr.detectChanges();

        console.log('tasks carregadas:', this.tasks);
      },
      error: (err) => console.error('Erro ao carregar tarefas:', err)
    });
  }

 deleteTask(id: number): void {
  const confirmDelete = window.confirm('Tem certeza que deseja deletar esta tarefa?');
  if (!confirmDelete) return; // se o usuário clicar em "Cancelar", não faz nada

  this.service.deleteTask(id).subscribe({
    next: () => {
      this.loadTask();
      console.log('Tarefa deletada com sucesso!');
    },
    error: (err) => console.error('Erro ao deletar:', err)
  });
}

}
