import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div class="flex flex-row p-4">
        <div class="self-center">
          {{ todo.title }}
        </div>
        <button class="ml-4 rounded-md bg-teal-200 p-2" (click)="update(todo)">
          Update
        </button>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);

  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      const updatedTodos = this.todos().map((todo) =>
        todo.id === todoUpdated.id ? todoUpdated : todo,
      );
      this.todos.set(updatedTodos);
    });
  }
}
