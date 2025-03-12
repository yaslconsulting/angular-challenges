import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Todo } from './model/todo.model';
import { TodoService } from './services/todo.service';
import { TodoStore } from './store/todo.store';

describe('AppComponent', () => {
  let component: AppComponent;
  let todoService: jest.Mocked<TodoService>;
  let todoStore: jest.Mocked<TodoStore>;

  beforeEach(() => {
    const todoServiceMock = {
      getTodos: jest.fn(),
      updateTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };

    const todoStoreMock = {
      todos: jest.fn(),
      addAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, MatProgressSpinnerModule, AppComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceMock },
        { provide: TodoStore, useValue: todoStoreMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jest.Mocked<TodoService>;
    todoStore = TestBed.inject(TodoStore) as jest.Mocked<TodoStore>;
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
    expect(todoService.getTodos).toHaveBeenCalledTimes(1);
  });

  it('should update todos on successful getAll', () => {
    // GIVEN
    const todos: Partial<Todo>[] = [{ id: 1, title: 'Test Todo' }];
    todoService.getTodos.mockReturnValue(of(todos as Todo[]));
    // WHEN
    component.getAll();
    // THEN
    expect(todoStore.addAll).toHaveBeenCalledWith(todos);
    expect(component.isLoading()).toBe(false);
  });
});
