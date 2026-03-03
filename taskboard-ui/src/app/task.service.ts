import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'https://localhost:5172/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  addTask(task: TaskItem): Observable<TaskItem[]> {
    return this.http.post<TaskItem[]>(this.apiUrl, task);
  }

  updateTask(id: number, task: TaskItem): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<TaskItem[]> {
    return this.http.delete<TaskItem[]>(`${this.apiUrl}/${id}`);
  }
}
