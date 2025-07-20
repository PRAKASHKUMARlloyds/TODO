import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import TodoItem from '../component/TodoItem/TodoItem';
import { toggleTodo, deleteTodo } from '../redux/todosSlice';
import dayjs from 'dayjs';

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

const renderTodo = (overrides = {}) => {
  const defaultProps = {
    id: 1,
    text: 'Write unit tests',
    completed: false,
    priority: 'Medium',
    dueDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    ...overrides,
  };

  const store = mockStore({});
  store.dispatch = mockDispatch;

  render(
    <Provider store={store}>
      <TodoItem {...defaultProps} />
    </Provider>
  );

  return defaultProps;
};

describe('TodoItem Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('renders todo text, priority, and due date', () => {
    renderTodo();
    expect(screen.getByText(/Write unit tests/i)).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  test('renders overdue chip if dueDate is past and not completed', () => {
    renderTodo({ dueDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD') });
    expect(screen.getByText(/Overdue/i)).toBeInTheDocument();
  });

  test('shows "Due:" instead of "Overdue" if completed', () => {
    renderTodo({ completed: true, dueDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD') });
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
    expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
  });

  test('does not render due chip if no dueDate', () => {
    renderTodo({ dueDate: null });
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
  });

  test('renders priority chip with correct label and handles default case', () => {
    renderTodo({ priority: 'High' });
    expect(screen.getByText('High')).toBeInTheDocument();

    renderTodo({ priority: 'Low' });
    expect(screen.getByText('Low')).toBeInTheDocument();

    renderTodo({ priority: 'Urgent' }); // unknown => default
    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  test('renders strikethrough text if completed', () => {
    renderTodo({ completed: true });
    const text = screen.getByText(/Write unit tests/i);
    expect(text).toHaveStyle('text-decoration: line-through');
  });

  test('dispatches toggleTodo when checkbox clicked', async () => {
    renderTodo();
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith(toggleTodo(1));
  });

  test('dispatches deleteTodo when delete button clicked', async () => {
    renderTodo();
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteBtn);
    expect(mockDispatch).toHaveBeenCalledWith(deleteTodo(1));
  });
});