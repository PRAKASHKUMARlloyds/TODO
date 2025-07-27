//add todo saga
import { call, put, takeLatest } from 'redux-saga/effects';
import { addTodo, deleteTodo, toggleTodo,fetchTodos } from '../redux/todosSlice';
import { addTodo as addTodoService, deleteTodo as deleteTodoService, toggleTodo as toggleTodoService, getTodos as getTodosService } from '../services/TodoServices'; 
import { Todo } from '../services/TodoTypes';
import { addTodoRequest,deleteTodoRequest,toggleTodoRequest,fetchTodosRequest } from '../redux/todoAction';
import { PayloadAction } from '@reduxjs/toolkit';
// add todo saga
function* handleAddTodo(action : PayloadAction<Todo>) {
    try {
        
        const newTodo: Todo = yield call(addTodoService, action.payload);
        yield put(addTodo(newTodo));
    } catch (error) {
        console.error(error);
    }   
}

// delete todo saga
function* handleDeleteTodo(action : PayloadAction<number>) {
    try {
        yield call(deleteTodoService, action.payload);
        yield put(deleteTodo(action.payload));
    } catch (error) {
        console.error(error);
    }   
}

// toggle todo saga
function* handleToggleTodo(action : PayloadAction<number>) {
    try {
        yield call(toggleTodoService, action.payload);
        yield put(toggleTodo(action.payload));
    } catch (error)  {
        console.error(error);
    }       
}
// fetch todo saga


function* handleFetchTodos() {
    try {
        const todos: Todo[] = yield call(getTodosService);
        yield put(fetchTodos(todos));
    }
    catch (error) {
        console.error(error);
    }
}
export function* todoSaga() {
    yield takeLatest(addTodoRequest.type, handleAddTodo);
    yield takeLatest(deleteTodoRequest.type, handleDeleteTodo);
    yield takeLatest(toggleTodoRequest.type, handleToggleTodo);
    yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
}
// todo saga
export default todoSaga;