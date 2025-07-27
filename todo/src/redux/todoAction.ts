import { createAction } from '@reduxjs/toolkit';
import { NewTodoPayload } from '../services/NewTodoTypes';

// Saga trigger for adding a todo
export const addTodoRequest = createAction<NewTodoPayload>('todos/addTodoRequest');

// Saga trigger for deleting a todo
export const deleteTodoRequest = createAction<number>('todos/deleteTodoRequest');

// Saga trigger for toggling a todo
export const toggleTodoRequest = createAction<number>('todos/toggleTodoRequest');

// fetch all todos (e.g., from API)
export const fetchTodosRequest = createAction('todos/fetchTodosRequest');