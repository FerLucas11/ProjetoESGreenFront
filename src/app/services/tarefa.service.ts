import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'zone.js/lib/zone-impl';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl = 'http://localhost:5044/api/Tarefa';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  getTask(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  createTask(task: any): Observable<any> {
    console.log(task);
    return this.http.post<any>(this.apiUrl, task);
  }

  updateTask(task: Tarefa): Observable<void> {
    console.log(task);
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  concludeTask(task: Tarefa): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${task.id}`, task);
  }
}
