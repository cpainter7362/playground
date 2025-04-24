import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('medium');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error('Error parsing stored todos:', error);
        setTodos([]);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo.trim(), 
        completed: false,
        priority
      }]);
      setNewTodo('');
      setPriority('medium');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all todos?')) {
      setTodos([]);
    }
  };

  const downloadTodos = () => {
    const markdown = todos.map(todo => 
      `- [${todo.completed ? 'x' : ' '}] ${todo.text} (Priority: ${todo.priority})`
    ).join('\n');
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h1 className="card-title text-center mb-4">Todo List</h1>
              
              <div className="alert alert-warning mb-4">
                <div className="d-flex align-items-center">
                  <span className="me-2">⚠️</span>
                  <div>
                    <strong>Security Notice:</strong> This app uses localStorage which is vulnerable to XSS attacks. 
                    Never store sensitive data here as malicious scripts can access it.
                  </div>
                </div>
              </div>

              <form onSubmit={addTodo} className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                  />
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-select form-select-lg"
                    style={{ maxWidth: '180px' }}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button className="btn btn-primary btn-lg" type="submit">Add</button>
                </div>
              </form>

              <div className="d-flex justify-content-between mb-4">
                <button
                  onClick={clearAll}
                  className="btn btn-danger"
                >
                  Clear All
                </button>
                <button
                  onClick={downloadTodos}
                  className="btn btn-success d-flex align-items-center"
                >
                  <Download className="me-2" size={16} />
                  Download
                </button>
              </div>

              <div className="todo-list">
                {todos.map(todo => (
                  <div 
                    key={todo.id} 
                    className={`todo-item ${
                      todo.priority === 'high' ? 'border-start border-danger border-3' :
                      todo.priority === 'medium' ? 'border-start border-warning border-3' :
                      'border-start border-success border-3'
                    }`}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        id={`todo-${todo.id}`}
                      />
                      <label 
                        className={`form-check-label ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
                        htmlFor={`todo-${todo.id}`}
                      >
                        {todo.text}
                      </label>
                    </div>
                    <div className="ms-auto d-flex align-items-center">
                      <span className="badge bg-secondary me-2">
                        {todo.priority}
                      </span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp; 