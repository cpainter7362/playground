import React, { useState, useEffect } from 'react';

const SimpleFetchDemo = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    setPosts([]);
    setFocusedIndex(-1);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data.slice(0, 6));
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % posts.length);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex(prev => (prev - 1 + posts.length) % posts.length);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        const rowSize = 3; // Number of cards per row
        const currentRow = Math.floor(index / rowSize);
        const currentCol = index % rowSize;
        const totalRows = Math.ceil(posts.length / rowSize);
        
        if (event.key === 'ArrowUp') {
          const newRow = (currentRow - 1 + totalRows) % totalRows;
          const newIndex = newRow * rowSize + currentCol;
          setFocusedIndex(newIndex < posts.length ? newIndex : newIndex - rowSize + Math.min(currentCol, (posts.length % rowSize) || rowSize));
        } else {
          const newRow = (currentRow + 1) % totalRows;
          const newIndex = newRow * rowSize + currentCol;
          setFocusedIndex(newIndex < posts.length ? newIndex : currentCol);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < posts.length) {
      const element = document.getElementById(`post-${focusedIndex}`);
      if (element) {
        element.focus();
      }
    }
  }, [focusedIndex]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center mb-4">Simple Fetch Demo</h1>
          
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title h5">About This Demo</h2>
              <p className="card-text">
                This page demonstrates using JavaScript's built-in fetch API to retrieve data from{' '}
                <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a>.
                We're fetching posts from the <code>/posts</code> endpoint and displaying them below. The page includes 
                loading states and error handling to ensure a good user experience even if the API is unavailable.
              </p>
              <p className="card-text">
                Use arrow keys to navigate between posts. Press Tab to move focus to interactive elements.
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 mb-0">Posts from JSONPlaceholder</h2>
                <button onClick={fetchPosts} className="btn btn-primary">
                  Refresh Posts
                </button>
              </div>
              
              {loading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              
              <div className="row g-4" role="list">
                {posts.map((post, index) => (
                  <div key={post.id} className="col-md-6 col-lg-4" role="listitem">
                    <div 
                      id={`post-${index}`}
                      className={`card h-100 ${focusedIndex === index ? 'border-primary' : ''}`}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={() => setFocusedIndex(index)}
                      style={{ outline: focusedIndex === index ? '2px solid var(--bs-primary)' : 'none' }}
                    >
                      <div className="card-body">
                        <h3 className="card-title h6">{post.title}</h3>
                        <p className="card-text small">{post.body}</p>
                      </div>
                      <div className="card-footer bg-transparent">
                        <small className="text-muted">Post ID: {post.id}</small>
                      </div>
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

export default SimpleFetchDemo; 