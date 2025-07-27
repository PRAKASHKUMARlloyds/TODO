export interface Todo {
  id: number;
  text: string;
  priority: string;
  dueDate: string | null;
  completed: boolean;
}

export type NewTodoPayload = Omit<Todo, "id" | "completed">;