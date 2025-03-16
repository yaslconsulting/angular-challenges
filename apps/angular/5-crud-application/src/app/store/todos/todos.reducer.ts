import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../model/todo.model.js';
import * as TodoActions from './todos.actions';

export interface TodoState {
  todos: Todo[];
  error: any;
}

export const initialState: TodoState = {
  todos: [],
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, todos })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, error })),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
  })),
);
