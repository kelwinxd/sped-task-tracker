import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskServiceTs } from '../../../services/task.service.ts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create.task.component',
  imports: [ReactiveFormsModule],
  templateUrl: './create.task.component.html',
  styleUrl: './create.task.component.css',
})
export class CreateTaskComponent {
  form!: FormGroup

  constructor(private fb:FormBuilder, private service: TaskServiceTs, private router: Router){
    this.form = this.fb.group({
      titulo:['', Validators.required, Validators.min(3)],
      descricao:['', Validators.required, Validators.min(5)]
    })
  }

  submit(){
    if(this.form.invalid) return

    this.service.createTask(this.form.value).subscribe({
      next: () => {
        alert("Tarefa Criada com Sucesso!")
        this.router.navigate(["/tasks"])
        this.form.reset()
      },

      error: (err) => {
        console.error(err, "erro ao cadastrar")
        alert("Erro ao Criar!")
      }
    })
  }



}
