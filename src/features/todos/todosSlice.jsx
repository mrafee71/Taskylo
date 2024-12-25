// src/features/todos/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  completed: [],
  highestPriority: 0,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.highestPriority += 1;
      const newTodo = { 
        ...action.payload, 
        currentPriority: state.highestPriority, 
        originalPriority: state.highestPriority 
      };
      state.todos.push(newTodo);
      state.todos = state.todos.sort((a, b) => b.currentPriority - a.currentPriority);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.completed = state.completed.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (!todo) {
        const completedTodo = state.completed.find(todo => todo.id === action.payload);
        if (completedTodo) {
          completedTodo.completed = false;
          state.todos.splice(completedTodo.previousIndex, 0, completedTodo);
          state.completed = state.completed.filter(t => t.id !== action.payload);
        }
      } else {
        todo.completed = !todo.completed;
        if (todo.completed) {
          state.completed.push(todo);
          state.todos = state.todos.filter(t => t.id !== action.payload);
        }
      }
    },
    pinTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        state.highestPriority += 1;
        if (!todo.pinned) {
          todo.pinned = true;
          todo.originalPriority = todo.currentPriority;
          todo.currentPriority = state.highestPriority;
        } else {
          todo.pinned = false;
          todo.currentPriority = todo.originalPriority;
        }
        state.todos = state.todos.sort((a, b) => b.currentPriority - a.currentPriority);
      }
    }
  },
});

export const { addTodo, removeTodo, updateTodo, toggleComplete, pinTodo } = todosSlice.actions;
export default todosSlice.reducer;