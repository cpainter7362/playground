import React, { useState, useEffect } from 'react';

const LocalFetchDemo = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const fetchRandomNumbers = async () => {
    setLoading(true);
    setStatus(null);
    setNumbers([]);
    setFocusedIndex(-1);
    
    try {
      const response = await fetch('http://localhost:3003/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setNumbers(data.numbers);
      
      setStatus({
        type: 'success',
        title: 'API Server Connected!',
        message: 'Successfully connected to the Random Number Express API running locally.'
      });
      
    } catch (error) {
      let errorTitle = 'Error';
      let errorMessage = error.message;
      let isServerNotRunning = error.message.includes('Failed to fetch') || error.message.includes('NetworkError');
      
      if (isServerNotRunning) {
        errorTitle = 'API Server Not Running';
        errorMessage = 'It looks like the Random Number Express API server is not running locally on port 3003.';
      }
      
      setStatus({
        type: isServerNotRunning ? 'warning' : 'danger',
        title: errorTitle,
        message: errorMessage,
        showInstructions: isServerNotRunning
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomNumbers();
  }, []);

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % numbers.length);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex(prev => (prev - 1 + numbers.length) % numbers.length);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        const rowSize = 6; // Number of cards per row
        const currentRow = Math.floor(index / rowSize);
        const currentCol = index % rowSize;
        const totalRows = Math.ceil(numbers.length / rowSize);
        
        if (event.key === 'ArrowUp') {
          const newRow = (currentRow - 1 + totalRows) % totalRows;
          const newIndex = newRow * rowSize + currentCol;
          setFocusedIndex(newIndex < numbers.length ? newIndex : newIndex - rowSize + Math.min(currentCol, (numbers.length % rowSize) || rowSize));
        } else {
          const newRow = (currentRow + 1) % totalRows;
          const newIndex = newRow * rowSize + currentCol;
          setFocusedIndex(newIndex < numbers.length ? newIndex : currentCol);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < numbers.length) {
      const element = document.getElementById(`number-${focusedIndex}`);
      if (element) {
        element.focus();
      }
    }
  }, [focusedIndex]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center mb-4">Local Fetch Demo</h1>
          
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title h5">About This Demo</h2>
              <p className="card-text">
                This page demonstrates fetching data from a local Express API server that generates random numbers. 
                To see it in action, you need to have the Random Number Express API running locally on port 3003.
              </p>
              <p className="card-text">
                You can find the API code and instructions in this{' '}
                <a href="https://github.com/cpainter7362/random-number-express-app" target="_blank" rel="noopener noreferrer">
                  GitHub repository
                </a>.
                The repository contains a dockerized Express.js API that generates 17 random numbers each time you call it.
              </p>
              <p className="card-text">
                Use arrow keys to navigate between numbers. Press Tab to move focus to interactive elements.
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h5 mb-0">Random Numbers</h2>
                <button onClick={fetchRandomNumbers} className="btn btn-primary">
                  Generate New Numbers
                </button>
              </div>

              {loading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              
              {status && (
                <div className={`alert alert-${status.type} mb-4`} role="alert">
                  <h4 className="alert-heading">{status.title}</h4>
                  <p>{status.message}</p>
                  {status.showInstructions && (
                    <>
                      <hr />
                      <p className="mb-0">To see this demo in action:</p>
                      <ol className="mt-2">
                        <li>Clone the <a href="https://github.com/cpainter7362/random-number-express-app" target="_blank" rel="noopener noreferrer">Random Number Express API repository</a></li>
                        <li>Follow the README instructions to build and run the Docker container</li>
                        <li>Once the server is running, click the button below to try again</li>
                      </ol>
                      <button className="btn btn-outline-warning mt-3" onClick={fetchRandomNumbers}>
                        Try Again
                      </button>
                    </>
                  )}
                </div>
              )}
              
              <div className="row g-4" role="list">
                {numbers.map((number, index) => (
                  <div key={index} className="col-md-3 col-lg-2" role="listitem">
                    <div
                      id={`number-${index}`}
                      className={`card text-center ${focusedIndex === index ? 'border-primary' : ''}`}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={() => setFocusedIndex(index)}
                      style={{ outline: focusedIndex === index ? '2px solid var(--bs-primary)' : 'none' }}
                    >
                      <div className="card-body">
                        <h3 className="display-4">{number}</h3>
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

export default LocalFetchDemo; 