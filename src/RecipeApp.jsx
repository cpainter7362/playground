import React, { useState } from 'react';
import { recipeData } from './RecipeData';
import './RecipeApp.css';

const RecipeApp = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
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
  };

  return (
    <div className="recipe-app">
      <header className="recipe-header">
        <h1>Cooking Method Learning Path</h1>
        <p>Master cooking techniques step by step</p>
      </header>
      
      <div className="filters">
        <div className="filter-group">
          <label>Difficulty Level:</label>
          <select 
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
          <label>Cooking Method:</label>
          <select 
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
      
      <div className="recipe-grid">
        {filteredRecipes.map(recipe => (
          <div className="recipe-card" key={recipe.id}>
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
            >
              View Recipe
            </button>
          </div>
        ))}
      </div>
      
      {/* Recipe Modal */}
      {showModal && selectedRecipe && (
        <div className="recipe-modal-overlay" onClick={closeModal}>
          <div className="recipe-modal-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>&times;</span>
            <h2>{selectedRecipe.title}</h2>
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