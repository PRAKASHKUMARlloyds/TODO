import axiosClient from "./AxiosClient"; 
import { Todo,  } from "./TodoTypes"; 
import {NewTodoPayload} from "./NewTodoTypes"; 

// Add a Todo
export const addTodo = async (payload: NewTodoPayload): Promise<Todo> => {
  try {
    const response = await axiosClient.post<Todo>("/todos", payload);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Delete a Todo
export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await axiosClient.delete(`/todos/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw error;
  }
};

// Toggle Completion Status
export const toggleTodo = async (id: number): Promise<void> => {
  try {
    await axiosClient.put(`/todos/${id}`);
  } catch (error) {
    console.error(`Error toggling todo with id ${id}:`, error);
    throw error;
  }
};

// Fetch All Todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axiosClient.get("/todos");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};