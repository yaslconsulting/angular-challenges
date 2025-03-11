import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos!: Todo[];

  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.todos[todoUpdated.id - 1] = todoUpdated;
    });
  }
}
