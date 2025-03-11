import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';
import { TodoStore } from './store/todo.store';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div class="flex flex-row p-4">
        <button class="rounded-md bg-teal-200 p-2" (click)="update(todo)">
          Update
        </button>
        <div class="ml-4 self-center">
          {{ todo.title }}
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todoService = inject(TodoService);
  todoStore = inject(TodoStore);

  todos = this.todoStore.todos;

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todoStore.addAll(todos);
    });
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((todoUpdated: Todo) => {
      this.todoStore.update(todoUpdated);
    });
  }
}
