import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TodoItem from '../TodoItem/TodoItem';

import {
  Typography,
  Container,
  Paper,
  Pagination,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Select,
  MenuItem
} from '@mui/material';
import dayjs from 'dayjs';

const ITEMS_PER_PAGE = 5;

type PriorityFilter = 'All' | 'Low' | 'Medium' | 'High';
type StatusFilter = 'All' | 'Active' | 'Completed';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [page, priorityFilter, statusFilter]);

  const filteredTodos = todos.filter((todo) => {
    const priorityMatch = priorityFilter === 'All' || todo.priority === priorityFilter;
    const statusMatch =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && !todo.completed) ||
      (statusFilter === 'Completed' && todo.completed);

    return priorityMatch && statusMatch;
  });

  const paginatedTodos = filteredTodos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} ref={listRef}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
           Todo Table 
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Total: {todos.length} | Active: {activeCount} | Completed: {completedCount}
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#007A33' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Task</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                  <Select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
                    sx={{
                      color: '#fff',
                      fontWeight: 'bold',
                      '& .MuiSelect-icon': { color: '#fff' },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      backgroundColor: 'transparent',
                      fontSize: '0.875rem'
                    }}
                    variant="standard"
                    disableUnderline
                  >
                    <MenuItem value="All">Priority: All</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Due Date</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                    sx={{
                      color: '#fff',
                      fontWeight: 'bold',
                      '& .MuiSelect-icon': { color: '#fff' },
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      backgroundColor: 'transparent',
                      fontSize: '0.875rem'
                    }}
                    variant="standard"
                    disableUnderline
                  >
                    <MenuItem value="All">Status: All</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTodos.map((todo) => {
                const isOverdue =
                  todo.dueDate &&
                  dayjs().isAfter(dayjs(todo.dueDate), 'day') &&
                  !todo.completed;

                return (
                  <TableRow key={todo.id}>
                    <TableCell
                      sx={{
                        maxWidth: 260,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {todo.text}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={todo.priority}
                        color={
                          todo.priority === 'High'
                            ? 'error'
                            : todo.priority === 'Medium'
                            ? 'warning'
                            : 'success'
                        }
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {todo.dueDate
                        ? dayjs(todo.dueDate).format('DD MMM YYYY')
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          todo.completed
                            ? 'Completed'
                            : isOverdue
                            ? 'Overdue'
                            : 'Active'
                        }
                        color={
                          todo.completed
                            ? 'success'
                            : isOverdue
                            ? 'error'
                            : 'warning'
                        }
                        size="small"
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      <TodoItem
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        priority={todo.priority}
                        dueDate={todo.dueDate}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ mt: 3, mb: 1 }} />

        <Pagination
          count={Math.ceil(filteredTodos.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Paper>
    </Container>
  );
};

export default TodoList;