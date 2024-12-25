import React from 'react';
import TodoList from './features/todos/TodoList';
import Logo from './assets/logo.png';

function App() {
  return (
    <div className="App">
      <h1 className='company-logo-head'>
        <img className='company-logo' src={Logo} alt="Logo" />
      </h1>
      <TodoList />
    </div>
  );
}

export default App;