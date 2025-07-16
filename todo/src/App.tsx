import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AddTodo from './component/AddTodo/AddTodo';
import TodoList from './component/TodoList/TodoList';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        
        <AddTodo />
         <TodoList />
      </div>
    </Provider>
  );
};

export default App;