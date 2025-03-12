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
import { Subject, takeUntil } from 'rxjs';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';
import { TodoStore } from './store/todo.store';

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
  todoStore = inject(TodoStore);
  private destroy$ = new Subject<void>();

  todos = this.todoStore.todos;
  isLoading = signal(false);

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading.set(true);
    this.todoService
      .getTodos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (todos) => {
          this.todoStore.addAll(todos);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.showError(err);
          this.isLoading.set(false);
        },
      });
  }

  update(todo: Todo): void {
    this.isLoading.set(true);
    this.todoService
      .updateTodo(todo)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (todoUpdated) => {
          this.todoStore.update(todoUpdated);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.showError(err);
          this.isLoading.set(false);
        },
      });
  }

  delete(id: number): void {
    this.isLoading.set(true);
    this.todoService
      .deleteTodo(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.todoStore.delete(id);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.showError(err);
          this.isLoading.set(false);
        },
      });
  }

  showError(text: string): void {
    window.alert(text);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
