import React, { useState } from 'react';

// Initial Pokemon data array with 7 objects
const initialPokemon = [
  { id: 1, name: 'Bulbasaur', level: 5 },
  { id: 2, name: 'Charmander', level: 5 },
  { id: 3, name: 'Squirtle', level: 5 },
  { id: 4, name: 'Pikachu', level: 5 },
  { id: 5, name: 'Eevee', level: 5 },
  { id: 6, name: 'Jigglypuff', level: 5 },
  { id: 7, name: 'Meowth', level: 5 }
];

// Individual Pokemon card component
const PokemonCard = ({ pokemon, onLevelUp }) => {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className={`card pokemon-${pokemon.name.toLowerCase()}`}>
        <div className="card-body">
          <h3 className="card-title">{pokemon.name}</h3>
          <p className="card-text">Level: {pokemon.level}</p>
          <button className="btn btn-primary" onClick={() => onLevelUp(pokemon.id)}>Level Up!</button>
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  const [pokemon, setPokemon] = useState(initialPokemon);

  const handleLevelUp = (id) => {
    setPokemon(pokemon.map(p => 
      p.id === id ? { ...p, level: p.level + 1 } : p
    ));
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center mb-3">Pokemon Tracker</h1>
          <p className="text-center mb-4">Click 'Level Up!' to train your Pokemon!</p>
        </div>
      </div>
      <div className="row">
        {pokemon.map(p => (
          <PokemonCard 
            key={p.id} 
            pokemon={p} 
            onLevelUp={handleLevelUp}
          />
        ))}
      </div>
    </div>
  );
}

export default App;