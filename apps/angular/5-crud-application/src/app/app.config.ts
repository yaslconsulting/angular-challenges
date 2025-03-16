import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TodoEffects } from './store/todos/todos.effects';
import { todoReducer } from './store/todos/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
  ],
};
