import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';
import * as TodoActions from './store/todos/todos.actions';
import { selectAllTodos } from './store/todos/todos.selector';

describe('AppComponent', () => {
  let component: AppComponent;
  let todoService: jest.Mocked<TodoService>;
  let store: MockStore;

  beforeEach(() => {
    const todoServiceMock = {
      getTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, MatProgressSpinnerModule, AppComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceMock },
        provideMockStore({
          initialState: [],
          selectors: [
            { selector: selectAllTodos, value: [{ id: 1, title: 'test' }] },
          ],
        }),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jest.Mocked<TodoService>;
    store = TestBed.inject(MockStore);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should getAll on init', () => {
    // GIVEN
    const getAllSpy = jest.spyOn(component, 'getAll');
    todoService.getTodos.mockReturnValue(of([]));
    // WHEN
    component.ngOnInit();
    // THEN
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('should update todos on successful getAll', () => {
    // GIVEN
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    expect(component.todos().length).toEqual(0);
    // WHEN
    component.ngOnInit();
    store.overrideSelector(selectAllTodos, [
      { id: 1, title: 'test' },
    ] as Todo[]);
    store.refreshState();
    // THEN
    expect(dispatchSpy).toHaveBeenCalledWith(TodoActions.loadTodos());
    expect(component.todos().length).toEqual(1);
    expect(component.isLoading()).toBe(false);
  });
});
