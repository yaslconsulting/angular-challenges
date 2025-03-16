import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';
import * as TodoActions from './store/todos/todos.actions';
import { selectAllTodos } from './store/todos/todos.selector';

@Component({
  imports: [CommonModule, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <div class="absolute z-10 flex h-full w-full">
        <mat-spinner class="m-auto self-center"></mat-spinner>
      </div>
    }
    @for (todo of todos(); track todo.id) {
      <div class="flex flex-row p-4">
        <button
          class="rounded-md bg-teal-200 p-2"
          [disabled]="isLoading()"
          (click)="update(todo)">
          Update
        </button>
        <button
          class="ml-4 rounded-md bg-red-400 p-2"
          [disabled]="isLoading()"
          (click)="delete(todo.id)">
          Delete
        </button>
        <div class="ml-4 self-center">{{ todo.id }} - {{ todo.title }}</div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  todoService = inject(TodoService);
  store = inject(Store);
  private destroy$ = new Subject<void>();

  todos = signal<Todo[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.store
      .pipe(select(selectAllTodos), takeUntil(this.destroy$))
      .subscribe((todos) => {
        this.todos.set(todos);
        this.isLoading.set(false);
      });
    this.getAll();
  }

  getAll(): void {
    this.isLoading.set(true);
    this.store.dispatch(TodoActions.loadTodos());
  }

  update(todo: Todo): void {
    this.isLoading.set(true);
    this.store.dispatch(TodoActions.updateTodo({ todo }));
  }

  delete(id: number): void {
    this.isLoading.set(true);
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  showError(text: string): void {
    window.alert(text);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
