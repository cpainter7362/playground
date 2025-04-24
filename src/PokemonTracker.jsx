import React, { useState } from 'react';

const PokemonTracker = () => {
  const [pokemon, setPokemon] = useState([
    { id: 1, name: 'Bulbasaur', level: 1 },
    { id: 2, name: 'Charmander', level: 1 },
    { id: 3, name: 'Squirtle', level: 1 },
    { id: 4, name: 'Pikachu', level: 1 },
    { id: 5, name: 'Eevee', level: 1 },
    { id: 6, name: 'Jigglypuff', level: 1 },
    { id: 7, name: 'Meowth', level: 1 }
  ]);

  const handleLevelUp = (id) => {
    setPokemon(pokemon.map(p => 
      p.id === id ? { ...p, level: p.level + 1 } : p
    ));
  };

  const getBackgroundClass = (name) => {
    return `pokemon-${name.toLowerCase()}`;
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Pokemon Tracker</h1>
      <div className="row g-4">
        {pokemon.map(p => (
          <div key={p.id} className="col-md-6 col-lg-4">
            <div className={`card pokemon-card h-100 ${getBackgroundClass(p.name)}`}>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center mb-3">{p.name}</h3>
                <div className="text-center mb-4">
                  <span className="badge bg-light text-dark fs-5 px-4 py-2">
                    Level {p.level}
                  </span>
                </div>
                <button 
                  onClick={() => handleLevelUp(p.id)}
                  className="btn btn-light mt-auto w-100 fw-bold"
                >
                  Level Up!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonTracker; 