import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addTodo } from '../../redux/todosSlice';

// Material UI Components
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const AddTodo: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    
      dispatch(addTodo(input));
      setInput('');
    
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: '2rem auto' }}>
      <Typography variant="h5" gutterBottom>
        Add a New Task
      </Typography>

      <Box display="flex" gap={2} alignItems="center" flexDirection="column">
        <TextField
          label="Todo"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your todo item"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          fullWidth
          disabled={!input.trim()}
        >
          Add Todo
        </Button>
      </Box>
    </Paper>
  );
};

export default AddTodo;
