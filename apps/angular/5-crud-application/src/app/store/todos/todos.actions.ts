import { createAction, props } from '@ngrx/store';
import { Todo } from '../../model/todo.model';

export const LOAD_TODOS = '[Todo] Load Todos';
export const LOAD_TODOS_SUCCESS = '[Todo] Load Todos Success';
export const LOAD_TODOS_FAILURE = '[Todo] Load Todos Failure';
export const UPDATE_TODO = '[Todo] Update Todo';
export const UPDATE_TODO_SUCCESS = '[Todo] Update Todo Success';
export const DELETE_TODO = '[Todo] Delete Todo';
export const DELETE_TODO_SUCCESS = '[Todo] Delete Todo Success';

export const loadTodos = createAction(LOAD_TODOS);
export const loadTodosSuccess = createAction(
  LOAD_TODOS_SUCCESS,
  props<{ todos: Todo[] }>(),
);
export const loadTodosFailure = createAction(
  LOAD_TODOS_FAILURE,
  props<{ error: any }>(),
);

export const updateTodo = createAction(UPDATE_TODO, props<{ todo: Todo }>());
export const updateTodoSuccess = createAction(
  UPDATE_TODO_SUCCESS,
  props<{ todo: Todo }>(),
);
export const deleteTodo = createAction(DELETE_TODO, props<{ id: number }>());
export const deleteTodoSuccess = createAction(
  DELETE_TODO_SUCCESS,
  props<{ id: number }>(),
);
