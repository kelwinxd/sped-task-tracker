import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskServiceTs } from '../../../services/task.service.ts';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create.task.component',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.task.component.html',
  styleUrls: ['./create.task.component.css'],
})
export class CreateTaskComponent {

  constructor(private fb:FormBuilder, private service: TaskServiceTs, private router: Router){

    this.form = this.fb.group({

      titulo:['', [Validators.required, Validators.min(3), Validators.max(30)]], //Validações para Input Titulo
      descricao:['', [Validators.required, Validators.min(5),Validators.max(70) ]] //Validações para Input Descricao

    })

  }

  form!: FormGroup

  submit(){
    if(this.form.invalid) return

    this.service.createTask(this.form.value).subscribe({
      //Função se der Certo
      next: () => {
        alert("Tarefa Criada com Sucesso!")
        this.router.navigate(["/tasks"])
        this.form.reset()
      },

      //Tratamento de erros
      error: (err) => {
        console.error(err, "erro ao cadastrar")
        alert("Erro ao Criar!")
      }
    })
  }


}
