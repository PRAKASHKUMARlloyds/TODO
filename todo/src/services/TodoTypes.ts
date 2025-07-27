export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
  dueDate: string | null;
}