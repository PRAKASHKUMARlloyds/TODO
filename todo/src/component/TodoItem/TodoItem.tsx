import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../../redux/todosSlice';
import { AppDispatch } from '../../redux/store';

import {
  Box,
  Checkbox,
  IconButton,
  Typography,
  Paper,
  Chip,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

interface Props {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
  dueDate?: string | null;
}

const TodoItem: React.FC<Props> = ({ id, text, completed, priority, dueDate }) => {
  const dispatch = useDispatch<AppDispatch>();

  const getPriorityColor = () => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const isOverdue = dueDate ? dayjs().isAfter(dayjs(dueDate), 'day') && !completed : false;

  return (
    <Paper
      elevation={2}
      sx={{
        padding: 2,
        marginBottom: 2,
        borderLeft: `5px solid ${
          completed ? '#ccc' : isOverdue ? '#d32f2f' : '#007A33'
        }`
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Checkbox
            checked={completed}
            onChange={() => dispatch(toggleTodo(id))}
            color="primary"
          />
          <Tooltip title={text}>
            <Typography
              variant="body1"
              sx={{
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'text.secondary' : 'text.primary',
                maxWidth: 240,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {text}
            </Typography>
          </Tooltip>
          <Chip
            label={priority}
            color={getPriorityColor()}
            size="small"
            variant="outlined"
          />
          {dueDate && (
            <Chip
              label={
                isOverdue && !completed
                  ? `🚨 Overdue (${dayjs(dueDate).format('DD MMM')})`
                  : `📅 Due: ${dayjs(dueDate).format('DD MMM')}`
              }
              size="small"
              color={isOverdue && !completed ? 'error' : 'default'}
              variant="outlined"
            />
          )}
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