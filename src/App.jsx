import React, { useState } from 'react';
import RecipeApp from './RecipeApp';
import TodoApp from './TodoApp';
import PokemonTracker from './PokemonTracker';
import Gallery from './Gallery';
import Contact from './Contact';
import SimpleFetchDemo from './SimpleFetchDemo';
import LocalFetchDemo from './LocalFetchDemo';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card featured-card mb-4">
                  <div className="card-body">
                    <h2 className="card-title text-center">Featured Application</h2>
                    <div className="text-center mb-4">
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" alt="Cooking" className="img-fluid rounded mb-3" style={{ maxHeight: '200px' }} />
                    </div>
                    <h3 className="text-center">Recipe App</h3>
                    <p className="card-text text-center">Master cooking techniques with our interactive recipe application. Perfect for beginners and experienced cooks alike!</p>
                    <div className="text-center">
                      <button className="btn btn-primary" onClick={() => setCurrentPage('recipe')}>Try the Recipe App</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="card-title">To-Do Application</h4>
                    <p className="card-text">A simple and effective task management tool built with React.</p>
                    <button className="btn btn-outline-primary" onClick={() => setCurrentPage('todo')}>View App</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="card-title">Pokemon Tracker</h4>
                    <p className="card-text">Track and manage your favorite Pokemon with this React application.</p>
                    <button className="btn btn-outline-primary" onClick={() => setCurrentPage('pokemon')}>View App</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h4 className="card-title">Photo Gallery</h4>
                    <p className="card-text">A beautiful gallery showcasing various images with interactive features.</p>
                    <button className="btn btn-outline-primary" onClick={() => setCurrentPage('gallery')}>View Gallery</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'recipe':
        return <RecipeApp />;
      case 'todo':
        return <TodoApp />;
      case 'pokemon':
        return <PokemonTracker />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      case 'simple-fetch':
        return <SimpleFetchDemo />;
      case 'local-fetch':
        return <LocalFetchDemo />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <a className="navbar-brand" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>My Website</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Contact</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'todo' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('todo'); }}>To-Do Application</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'gallery' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('gallery'); }}>Gallery</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'pokemon' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('pokemon'); }}>Pokemon Tracker</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'simple-fetch' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('simple-fetch'); }}>Simple Fetch Demo</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'local-fetch' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('local-fetch'); }}>Local Fetch Demo</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${currentPage === 'recipe' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('recipe'); }}>Recipe App</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {renderContent()}
    </div>
  );
};

export default App;