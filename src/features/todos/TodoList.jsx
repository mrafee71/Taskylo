// src/features/todos/TodoList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo, toggleComplete, pinTodo } from './todosSlice';
import { FaTrashAlt, FaEdit, FaCheck, FaThumbtack, FaUndo } from 'react-icons/fa';
import './styles.css';

const TodoList = () => {
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const completed = useSelector(state => state.todos.completed);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo({
        id: Date.now(),
        text: input,
        completed: false,
        pinned: false,
      }));
      setInput('');
    }
  };

  const handleUpdate = (id, text) => {
    setEditId(id);
    setInput(text);
  };

  const handleSaveUpdate = () => {
    dispatch(updateTodo({ id: editId, text: input }));
    setEditId(null);
    setInput('');
  };

  const pinnedTodos = todos.filter(todo => todo.pinned).sort((a, b) => b.currentPriority - a.currentPriority);
  const unpinnedTodos = todos.filter(todo => !todo.pinned);

  return (
    <div className='todo-list'>
      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'center' }}>
        <input className='todo-input-field' value={input} onChange={e => setInput(e.target.value)} style={{ flexGrow: 1 }} />
        <button onClick={editId ? handleSaveUpdate : handleAdd}>
          {editId ? 'Update' : 'Add'}
        </button>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h3>To-Do</h3>
        <ul>
          {pinnedTodos.map(todo => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <div className="todo-actions">
                <button onClick={() => dispatch(toggleComplete(todo.id))}>
                  <FaCheck />
                </button>
                <button onClick={() => handleUpdate(todo.id, todo.text)}>
                  <FaEdit />
                </button>
                <button onClick={() => dispatch(removeTodo(todo.id))}>
                  <FaTrashAlt />
                </button>
                <button onClick={() => dispatch(pinTodo(todo.id))}>
                  <FaThumbtack style={{ color: todo.pinned ? 'gold' : 'black' }} />
                </button>
              </div>
            </li>
          ))}
          {unpinnedTodos.map(todo => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <div className="todo-actions">
                <button onClick={() => dispatch(toggleComplete(todo.id))}>
                  <FaCheck />
                </button>
                <button onClick={() => handleUpdate(todo.id, todo.text)}>
                  <FaEdit />
                </button>
                <button onClick={() => dispatch(removeTodo(todo.id))}>
                  <FaTrashAlt />
                </button>
                <button onClick={() => dispatch(pinTodo(todo.id))}>
                  <FaThumbtack style={{ color: todo.pinned ? 'gold' : 'black' }} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h3>Completed</h3>
        <ul>
          {completed.map(todo => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
              <div className="todo-actions">
                <button onClick={() => dispatch(toggleComplete(todo.id))}>
                  <FaUndo />
                </button>
                <button onClick={() => dispatch(removeTodo(todo.id))}>
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;