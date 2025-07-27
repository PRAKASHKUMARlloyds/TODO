import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../services/TodoTypes";

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = { items: [] };

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.items.push(action.payload);
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    fetchTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
  }
});

export const { addTodo, toggleTodo, deleteTodo,fetchTodos } = todoSlice.actions;
export default todoSlice.reducer;