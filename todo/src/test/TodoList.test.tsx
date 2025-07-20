import React from 'react';
import { render, screen, within } from '@testing-library/react';
import TodoList from '../component/TodoList/TodoList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

window.HTMLElement.prototype.scrollIntoView = jest.fn(); // Prevent scroll error

const mockStore = configureStore([]);

const generateTodo = (
  id: number,
  overrides: Partial<{
    completed: boolean;
    priority: string;
    dueDate: string | null;
    text: string;
  }> = {}
) => ({
  id,
  text: `Todo ${id}`,
  completed: false,
  priority: 'Medium',
  dueDate: dayjs().add(id, 'day').format('YYYY-MM-DD'),
  ...overrides,
});

const renderWithStore = (todos: any[]) => {
  const store = mockStore({ todos: { items: todos } });
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

describe('TodoList Component', () => {
  const todos = [
    generateTodo(1, { priority: 'High', completed: false }),
    generateTodo(2, { priority: 'Low', completed: true }),
    generateTodo(3, { priority: 'Medium', completed: false }),
    generateTodo(4, { priority: 'High', completed: true }),
    generateTodo(5, { priority: 'Low', completed: false }),
    generateTodo(6, { priority: 'Medium', completed: false }),
    generateTodo(7, { priority: 'Urgent', dueDate: null }),
  ];

  test('renders summary counts', () => {
    renderWithStore(todos);
    expect(screen.getByText(/Total: 7/i)).toBeInTheDocument();
    expect(screen.getByText(/Active: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed: 2/i)).toBeInTheDocument();
  });


  test('renders dash for missing dueDate', () => {
    renderWithStore([generateTodo(11, { dueDate: null })]);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  test('shows Overdue chip when due is past and not completed', () => {
    renderWithStore([
      generateTodo(12, {
        dueDate: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
        completed: false,
      }),
    ]);
    expect(screen.getByText('Overdue')).toBeInTheDocument();
  });

  test('shows Completed chip when completed is true', () => {
    renderWithStore([generateTodo(13, { completed: true })]);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});