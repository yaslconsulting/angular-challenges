// filepath: /home/yasl/yasl-web-projects/angular-challenges/apps/angular/5-crud-application/src/app/store/todo.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import * as TodoActions from './todos.actions';

@Injectable()
export class TodoEffects {
  todoService = inject(TodoService);
  actions$ = inject(Actions);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error }))),
        ),
      ),
    ),
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap((action) =>
        this.todoService.updateTodo(action.todo).pipe(
          map((todo) => TodoActions.updateTodoSuccess({ todo })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error }))),
        ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap((action) =>
        this.todoService.deleteTodo(action.id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error }))),
        ),
      ),
    ),
  );
}
