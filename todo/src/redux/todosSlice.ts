import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
    id: number,
    text: string,
    completed: boolean,
    priority: string;
    dueDate: string | null;

}

interface TodoState {
    items: Todo[]
}

const initialState: TodoState = { items: [] };
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<{ text: string; priority: string; dueDate: string | null }>) {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload.text,
                completed: false,
                priority: action.payload.priority,
                dueDate: action.payload.dueDate
            };
            state.items.push(newTodo);
        },

        toggleTodo(state, action: PayloadAction<number>) {
            const index = state.items.find(t => t.id === action.payload)
            if (index) index.completed = !index.completed
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.items = state.items.filter(t => t.id !== action.payload)
        }


    }

})
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer