import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todos.reducer';

export const TODO_FEATURE_NAME = 'todos';

export const selectTodoState =
  createFeatureSelector<TodoState>(TODO_FEATURE_NAME);

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos,
);
export const selectTodoError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error,
);
