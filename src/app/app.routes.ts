import { Routes } from '@angular/router';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { AdicionarTarefaComponent } from './pages/adicionar-tarefa/adicionar-tarefa.component';

export const routes: Routes = [
  { path: '', component: TarefaComponent },
  { path: 'adicionar-tarefa', component: AdicionarTarefaComponent},
  { path: 'editar-tarefa/:id', component: AdicionarTarefaComponent },
];