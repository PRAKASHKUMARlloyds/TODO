import React from 'react';
import { render, screen } from '@testing-library/react';
import AddTodo from '../src/component/AddTodo/AddTodo';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import userEvent from '@testing-library/user-event';

test('renders input and adds a todo', async () => {
  render(
    <Provider store={store}>
      <AddTodo />
    </Provider>
  );

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'Finish unit test');

  const addButton = screen.getByRole('button', { name: /ADD TODO/i });
  await userEvent.click(addButton);
  
});