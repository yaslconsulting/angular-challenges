import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  public todos = signal<Todo[]>([]);

  addAll(todos: Todo[]): void {
    this.todos.set(todos);
  }

  update(todoUpdated: Todo): void {
    const updatedTodos = this.todos().map((todo) =>
      todo.id === todoUpdated.id ? todoUpdated : todo,
    );
    this.todos.set(updatedTodos);
  }
}
