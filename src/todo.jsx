import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Download } from 'lucide-react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
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
    const trimmedTodo = newTodo.trim();
    if (trimmedTodo) {
      const newTodoItem = {
        id: Date.now(),
        text: trimmedTodo,
        completed: false,
        priority,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setPriority('medium');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    const trimmedEdit = editText.trim();
    if (trimmedEdit) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: trimmedEdit } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-5">
            <div className="card-body p-4">
              <h1 className="card-title h3 mb-4">Accessible Todo List</h1>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                <p className="text-yellow-800">
                    ⚠️ Security Notice: This app uses localStorage which is vulnerable to XSS attacks. 
                    Never store sensitive data here as malicious scripts can access it.
                </p>
            </div>
              <form onSubmit={addTodo} className="mb-4">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a new todo"
                    aria-label="New todo text"
                    className="form-control"
                  />
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-select"
                    style={{ maxWidth: '180px' }}
                    aria-label="Priority level"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    aria-label="Add todo"
                  >
                    Add
                  </button>
                </div>
              </form>

              <div className="d-flex justify-content-between mb-4">
                <button
                  onClick={clearAll}
                  className="btn btn-danger"
                  aria-label="Clear all todos"
                >
                  Clear All
                </button>
                <button
                  onClick={downloadTodos}
                  className="btn btn-success d-flex align-items-center"
                  aria-label="Download todos as markdown"
                >
                  <Download className="me-2" size={16} />
                  Download
                </button>
              </div>

              {todos.length > 0 ? (
                <ul className="list-group shadow-sm">
                  {todos.map(todo => (
                    <li
                      key={todo.id}
                      className={`list-group-item p-3 ${
                        todo.priority === 'high' ? 'border-start border-danger border-3' :
                        todo.priority === 'medium' ? 'border-start border-warning border-3' :
                        'border-start border-success border-3'
                      }`}
                    >
                      {editingId === todo.id ? (
                        <div className="d-flex gap-2">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="form-control"
                            aria-label="Edit todo text"
                          />
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="btn btn-primary"
                            aria-label="Save edit"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <div className="form-check d-flex align-items-center">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleComplete(todo.id)}
                              className="form-check-input me-3"
                              style={{ transform: 'scale(1.2)' }}
                              aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                              id={`todo-${todo.id}`}
                            />
                            <label 
                              className={`form-check-label ${todo.completed ? 'text-decoration-line-through text-muted' : 'fw-medium'}`}
                              htmlFor={`todo-${todo.id}`}
                              style={{ marginBottom: '0' }}
                            >
                              {todo.text}
                            </label>
                          </div>
                          <span className="ms-auto me-3 badge rounded-pill text-bg-secondary">
                            {todo.priority}
                          </span>
                          <button
                            onClick={() => startEditing(todo)}
                            className="btn btn-sm btn-outline-primary me-2"
                            aria-label={`Edit "${todo.text}"`}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="btn btn-sm btn-outline-danger"
                            aria-label={`Delete "${todo.text}"`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-5 text-muted">
                  <p>No todos yet. Add some tasks to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;