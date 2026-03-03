import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskService, TaskItem } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h1>Taskboard</h1>
    <input [(ngModel)]="newTask" placeholder="Enter task" />
    <button (click)="addTask()">Add</button>

    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} - {{ task.status }}
        <button (click)="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  tasks: TaskItem[] = [];
  newTask: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  addTask() {
    if (!this.newTask.trim()) return;
    const task: TaskItem = { id: 0, title: this.newTask, status: 'Pending' };
    this.taskService.addTask(task).subscribe(data => this.tasks = data);
    this.newTask = '';
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(data => this.tasks = data);
  }
}
