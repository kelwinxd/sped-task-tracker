import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskServiceTs } from '../../../services/task.service.ts';

@Component({
  selector: 'app-edit.task.component',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit.task.component.html',
  styleUrl: './edit.task.component.css',
})
export class EditTaskComponent implements OnInit {

  form!: FormGroup
  id!: number
  statuses = ["Pendente","Em Andamento","Concluído"]

  constructor(
    private router: Router, 
    private aroute: ActivatedRoute, 
    private service: TaskServiceTs, 
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.id = Number(this.aroute.snapshot.paramMap.get("id"))

    this.form = this.fb.group({
      descricao: ['', Validators.required, Validators.min(5)],
      status: ['', Validators.required]
    })

    this.service.getTask(this.id).subscribe({
      next: (task) => {
        this.form.patchValue({
          descricao: task.Descricao,
          status: task.Status

        })
      },
      error: (err) => {
        console.error('Erro ao Carregar Task', err)
      }
    })
  }

  submit(){
    if(this.form.invalid) return

    this.service.updateTask(this.id, this.form.value).subscribe({
      next: () => {
        alert("Sucesso ao Editar!")
        this.router.navigate(['/tasks'])
      },
      error: (err) => {
        alert("Erro ao Editar!")
        console.error("Erro ao Editar:", err)
      }
    })
  }

}
