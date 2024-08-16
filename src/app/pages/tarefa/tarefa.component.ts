import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatCardModule, RouterLink, MatIconModule,MatButtonModule],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class TarefaComponent implements OnInit{
  tarefa: Tarefa[] = [];

  constructor(private tarefaService: TarefaService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tarefaService.getTasks().subscribe(tarefa => {
      this.tarefa = tarefa;
    });
  }

  editar(e: any){
    if(e.status == 2)
    {
      this._snackBar.open(`Essa tarefa já foi concluída e não pode ser alterada!`, 'Fechar', {
        duration: 3000,
      });
    }
    else{
      this.router.navigate(['/editar-tarefa', e.id]);
    }
  }

  concluir(e: any){
    if(e.status == 2)
    {
      this._snackBar.open(`Tarefa já foi concluída!`, 'Fechar', {
        duration: 3000,
      });
    }
    else{
      this.tarefaService.concludeTask(e).subscribe(tarefa => {
        this.loadTasks();
      });
    }
  }

  excluir(e: any){
    this.tarefaService.deleteTask(e.id).subscribe(tarefa => {
      this.loadTasks();
    });
  }
}
