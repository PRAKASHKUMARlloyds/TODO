import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addTodo } from '../../redux/todosSlice';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

const MAX_LENGTH = 100;

const AddTodo: React.FC = () => {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const inputField = document.getElementById('todo-text') as HTMLInputElement | null;
    inputField?.focus();
  }, []);

  const handleClick = () => {
    if (!input.trim() || input.length > MAX_LENGTH) return;

    const newTodo = {
      text: input.trim(),
      priority,
      dueDate: dueDate?.format('YYYY-MM-DD') || null
    };

    dispatch(addTodo(newTodo));
    setInput('');
    setPriority('Medium');
    setDueDate(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 480, margin: '2rem auto' }}>
      <Typography variant="h5" gutterBottom>
        Add TODO
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          id="todo-text"
          label="Todo"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your todo item"
          helperText={`${input.length}/${MAX_LENGTH} characters`}
          error={input.length > MAX_LENGTH}
        />

        {/* <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl> */}
        <FormControl fullWidth>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"      
            id="priority-select"
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newDate) => setDueDate(newDate)}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>

        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={!input.trim() || input.length > MAX_LENGTH}
            fullWidth
          >
            Add Todo
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setInput('');
              setPriority('Medium');
              setDueDate(null);
            }}
            fullWidth
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AddTodo;