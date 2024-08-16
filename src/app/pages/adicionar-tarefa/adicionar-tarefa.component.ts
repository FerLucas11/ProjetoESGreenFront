import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatOptionModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core'; // Adicionar essa importação
import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-adicionar-tarefa',
  standalone: true,
  imports: [MatNativeDateModule  ,MatToolbarModule, ReactiveFormsModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, RouterLink],
  templateUrl: './adicionar-tarefa.component.html',
  styleUrl: './adicionar-tarefa.component.scss'
})
export class AdicionarTarefaComponent implements OnInit {
  tarefaForm: FormGroup;
  isEditMode = false;
  tarefaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tarefaForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      dataVencimento: ['', Validators.required],
      status: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.tarefaId = this.route.snapshot.params['id'];

    if (this.tarefaId) {
      this.isEditMode = true;
      this.tarefaService.getTask(this.tarefaId).subscribe(tarefa => {
        this.tarefaForm.patchValue(tarefa);
      });
    }
  }
  
  onSubmit(): void {
    if (this.tarefaForm.valid) {
      if (this.isEditMode) {
        const payload: Tarefa = {
          titulo: this.tarefaForm.value.titulo,
          descricao: this.tarefaForm.value.descricao,
          dataVencimento: this.tarefaForm.value.dataVencimento,
          status: this.tarefaForm.value.status,
          id: this.tarefaId!
        };
        this.tarefaService.updateTask(payload).subscribe(() => {
          this.router.navigate(['']);
        });
      } 
      else {
        this.tarefaService.createTask(this.tarefaForm.value).subscribe(() => {
          this.router.navigate(['']);
        });
      }
    }
  }
}
