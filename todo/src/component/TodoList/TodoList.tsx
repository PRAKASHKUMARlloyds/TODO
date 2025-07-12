import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TodoItem from '../TodoItem/TodoItem';

// Material UI
import { Typography, Container, Stack, Paper } from '@mui/material';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Your Todo List
        </Typography>

        {todos.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No todos yet!  Add your first task.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
              />
            ))}
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default TodoList;
