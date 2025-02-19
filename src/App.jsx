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
    <div className={`pokemon-card pokemon-${pokemon.name.toLowerCase()}`}>
      <h3>{pokemon.name}</h3>
      <p>Level: {pokemon.level}</p>
      <button onClick={() => onLevelUp(pokemon.id)}>Level Up!</button>
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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Pokemon Tracker</h1>
      <p>Click 'Level Up!' to train your Pokemon!</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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