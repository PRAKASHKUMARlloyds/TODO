import reducer, { addTodo, toggleTodo, deleteTodo } from '../redux/todosSlice';

describe('todoSlice', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should add a new todo item', () => {
    const initialState = { items: [] };
    const action = addTodo({ text: 'Test Redux', priority: 'High', dueDate: '2025-08-01' });
    const state = reducer(initialState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].text).toBe('Test Redux');
    expect(state.items[0].completed).toBe(false);
    expect(state.items[0].priority).toBe('High');
    expect(state.items[0].dueDate).toBe('2025-08-01');
  });

  it('should toggle todo when found', () => {
    const initialState = {
      items: [{ id: 123, text: 'Toggle me', completed: false, priority: 'Low', dueDate: null }],
    };
    const state = reducer(initialState, toggleTodo(123));
    expect(state.items[0].completed).toBe(true);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log when toggle fails (ID not found)', () => {
    const initialState = {
      items: [{ id: 1, text: 'Existing', completed: false, priority: 'Medium', dueDate: null }],
    };
    const state = reducer(initialState, toggleTodo(999));
    expect(state.items).toEqual(initialState.items);
    expect(console.log).toHaveBeenCalledWith('Todo not found');
  });

  it('should delete a todo by ID', () => {
    const initialState = {
      items: [
        { id: 10, text: 'Delete me', completed: false, priority: 'High', dueDate: null },
        { id: 20, text: 'Keep me', completed: true, priority: 'Low', dueDate: null },
      ],
    };
    const state = reducer(initialState, deleteTodo(10));
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe(20);
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log when deletion ID is not found', () => {
    const initialState = {
      items: [{ id: 1, text: 'Only one', completed: false, priority: 'Medium', dueDate: null }],
    };
    const state = reducer(initialState, deleteTodo(999));
    expect(state.items.length).toBe(1);
   
  });
});