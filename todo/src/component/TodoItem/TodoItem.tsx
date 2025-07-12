import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../../redux/todosSlice';
import { AppDispatch } from '../../redux/store';

// MUI Components
import {
  Box,
  Checkbox,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  id: number;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<Props> = ({ id, text, completed }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={completed}
            onChange={() => dispatch(toggleTodo(id))}
            color="primary"
          />
          <Typography
            variant="body1"
            sx={{
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? 'text.secondary' : 'text.primary'
            }}
          >
            {text}
          </Typography>
        </Box>
        <IconButton
          aria-label="delete"
          onClick={() => dispatch(deleteTodo(id))}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TodoItem;
