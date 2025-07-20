import React from 'react';
import { render, screen,fireEvent  } from '@testing-library/react';
import AddTodo from '../component/AddTodo/AddTodo';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import userEvent from '@testing-library/user-event';
jest.setTimeout(100000);
describe('AddTodo Component', () => {
  beforeEach(() =>  render(
    <Provider store={store}>
      <AddTodo />
    </Provider>
  ));

  test('renders input, select, date picker, and buttons', () => {
    expect(screen.getByLabelText(/Todo/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your todo item/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Todo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
  });

  test('shows helper text with character count and error for overflow', async () => {
    const input = screen.getByLabelText(/Todo/i);
    await userEvent.type(input, 'x'.repeat(101));
    expect(await screen.findByText('101/100 characters')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true'); 
  });

  test('disables Add Todo when input is empty or too long', () => {
    const input = screen.getByLabelText(/Todo/i);
    const addBtn = screen.getByRole('button', { name: /Add Todo/i });

    expect(addBtn).toBeDisabled();

    userEvent.type(input, 'x'.repeat(101));
    expect(addBtn).toBeDisabled();
  });

  test('adds todo when input is valid and clears the form after submit', async () => {
    const input = screen.getByLabelText(/Todo/i);
   
    const addBtn = screen.getByRole('button', { name: /Add Todo/i });
    const clearBtn = screen.getByRole('button', { name: /Clear/i });

    userEvent.type(input, 'Build test suite');
    userEvent.click(addBtn);
    expect(input).toHaveValue('');
  
  });

  test('clears all fields on Clear button', () => {
    const input = screen.getByLabelText(/Todo/i);
    userEvent.type(input, 'Some task');
    userEvent.click(screen.getByRole('button', { name: /Clear/i }));

    expect(input).toHaveValue('');
  });
  it.skip('renders and selects a priority value', async() => {
    const setPriority = jest.fn();
    const priority = 'Low';
     screen.debug();
    
     const select = await screen.getByTestId('priority-select');
    // fireEvent.mouseDown(select);

    
    // const mediumOption = screen.getByText('Medium');
    // fireEvent.click(mediumOption);

    
    // expect(setPriority).toHaveBeenCalledWith('Medium');
  });
});