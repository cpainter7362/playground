import React, { useState, useEffect, useRef } from 'react';
import { recipeData } from './RecipeData';
import './RecipeApp.css';

const RecipeApp = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const modalRef = useRef(null);
  
  // Get unique cooking methods from data
  const cookingMethods = ['all', ...new Set(recipeData.map(recipe => recipe.method))];
  
  // Get unique difficulty levels
  const difficultyLevels = ['all', 'beginner', 'intermediate', 'advanced'];
  
  // Filter recipes based on selections
  const filteredRecipes = recipeData.filter(recipe => {
    const levelMatch = selectedLevel === 'all' || recipe.level === selectedLevel;
    const methodMatch = selectedMethod === 'all' || recipe.method === selectedMethod;
    return levelMatch && methodMatch;
  });
  
  // Handle view recipe button click
  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
    // Return focus to the last focused recipe card
    if (focusedIndex >= 0) {
      const element = document.getElementById(`recipe-${focusedIndex}`);
      if (element) {
        element.focus();
      }
    }
  };

  // Handle keyboard navigation for recipe cards
  const handleKeyDown = (event, index) => {
    const rowSize = 3; // Number of cards per row
    const currentRow = Math.floor(index / rowSize);
    const currentCol = index % rowSize;
    const totalRows = Math.ceil(filteredRecipes.length / rowSize);

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex(prev => (prev + 1) % filteredRecipes.length);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex(prev => (prev - 1 + filteredRecipes.length) % filteredRecipes.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        const newRowUp = (currentRow - 1 + totalRows) % totalRows;
        const newIndexUp = newRowUp * rowSize + currentCol;
        setFocusedIndex(newIndexUp < filteredRecipes.length ? newIndexUp : newIndexUp - rowSize + Math.min(currentCol, (filteredRecipes.length % rowSize) || rowSize));
        break;
      case 'ArrowDown':
        event.preventDefault();
        const newRowDown = (currentRow + 1) % totalRows;
        const newIndexDown = newRowDown * rowSize + currentCol;
        setFocusedIndex(newIndexDown < filteredRecipes.length ? newIndexDown : currentCol);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleViewRecipe(filteredRecipes[index]);
        break;
      default:
        break;
    }
  };

  // Handle keyboard navigation for modal
  const handleModalKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  // Focus management for recipe cards
  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < filteredRecipes.length && !showModal) {
      const element = document.getElementById(`recipe-${focusedIndex}`);
      if (element) {
        element.focus();
      }
    }
  }, [focusedIndex, filteredRecipes.length, showModal]);

  // Focus management for modal
  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showModal]);

  // Reset focused index when filters change
  useEffect(() => {
    setFocusedIndex(-1);
  }, [selectedLevel, selectedMethod]);

  return (
    <div className="recipe-app">
      <header className="recipe-header">
        <h1>Cooking Method Learning Path</h1>
        <p>Master cooking techniques step by step</p>
        <p className="keyboard-instructions">
          Use arrow keys to navigate between recipes. Press Enter or Space to view recipe details.
          In the recipe details, press Escape to close.
        </p>
      </header>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="level-select">Difficulty Level:</label>
          <select 
            id="level-select"
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {difficultyLevels.map(level => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="method-select">Cooking Method:</label>
          <select 
            id="method-select"
            value={selectedMethod} 
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            {cookingMethods.map(method => (
              <option key={method} value={method}>
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="learning-path-info">
        <h2>Your Learning Path</h2>
        <p>
          Select a cooking method and difficulty level to find recipes that will help you 
          master new techniques. Start with beginner recipes and work your way up!
        </p>
      </div>
      
      <div className="recipe-grid" role="list">
        {filteredRecipes.map((recipe, index) => (
          <div 
            key={recipe.id}
            id={`recipe-${index}`}
            className={`recipe-card ${focusedIndex === index ? 'focused' : ''}`}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setFocusedIndex(index)}
            role="listitem"
            aria-label={`${recipe.title}, ${recipe.level} level, ${recipe.method} method`}
          >
            <div className={`recipe-level ${recipe.level}`}>
              {recipe.level.charAt(0).toUpperCase() + recipe.level.slice(1)}
            </div>
            <h3>{recipe.title}</h3>
            <div className="recipe-method">Method: {recipe.method}</div>
            <p className="recipe-desc">{recipe.description}</p>
            <div className="recipe-skills">
              <strong>Skills:</strong> {recipe.skills.join(', ')}
            </div>
            <button 
              className="view-recipe-btn"
              onClick={() => handleViewRecipe(recipe)}
              aria-label={`View recipe for ${recipe.title}`}
            >
              View Recipe
            </button>
          </div>
        ))}
      </div>
      
      {/* Recipe Modal */}
      {showModal && selectedRecipe && (
        <div 
          className="recipe-modal-overlay" 
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="recipe-modal-content" 
            onClick={e => e.stopPropagation()}
            ref={modalRef}
            tabIndex={-1}
            onKeyDown={handleModalKeyDown}
          >
            <button 
              className="modal-close" 
              onClick={closeModal}
              aria-label="Close recipe details"
            >
              &times;
            </button>
            <h2 id="modal-title">{selectedRecipe.title}</h2>
            <div className={`recipe-level-tag ${selectedRecipe.level}`}>
              {selectedRecipe.level.charAt(0).toUpperCase() + selectedRecipe.level.slice(1)}
            </div>
            <p className="recipe-method-tag">Method: {selectedRecipe.method}</p>
            <p className="modal-description">{selectedRecipe.description}</p>
            
            <div className="modal-skills">
              <strong>Skills You'll Learn:</strong>
              <ul>
                {selectedRecipe.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-ingredients">
              <h3>Ingredients</h3>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-instructions">
              <h3>Instructions</h3>
              <ol>
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            
            <div className="learning-tip">
              <strong>Learning Tip:</strong> Focus on mastering the {selectedRecipe.skills[0]} skill in this recipe before moving to more advanced techniques.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeApp;