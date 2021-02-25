import React, { useState, useEffect } from 'react';
import cx from 'classnames';

type Pokemon = {
  _id: string;
  name: string;
  type: string;
  height: number;
  weight: number;
  thumb: string;
};

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/pokemons`);
      const data = await res.json();
      setPokemons(data);
    }

    fetchPokemons();
  }, []);

  function getTypeColor(type: string) {
    return cx({
      'bg-green-dark': type.includes('Grass'),
      'bg-red-dark': type.includes('Fighting'),
      'bg-yellow-dark': type.includes('Electric'),
      'bg-purple': type.includes('Psy'),
      'bg-blue-dark': type.includes('Water'),
      'bg-orange-dark': type.includes('Fire'),
      'bg-gray': type.includes('Rock'),
      'bg-gray-light': type.includes('Normal'),
      'bg-pink': type.includes('Fairy'),
      'bg-blue': type.includes('Flying'),
    });
  }

  return (
    <div className="w-screen">
      <main className="bg-gray-lightest h-screen p-6">
        <h1 className="font-bold font-jp text-pink text-5xl pb-6">
          <span className="mr-4">関東に要こそ</span>
        </h1>
        <div className="grid grid-cols-6 gap-6">
          {pokemons.length > 0 &&
            pokemons.map((pokemon) => (
              <div
                key={pokemon._id}
                className={`${getTypeColor(
                  pokemon.type,
                )} flex-shrink-0 p-6 rounded-lg max-w-xs shadow-lg hover:opacity-20 transition-all duration-300 cursor-pointer pokemon-card`}
              >
                <img className="mx-auto" src={pokemon.thumb} alt={pokemon.name} />
                <div className="pt-6">
                  <h4 className="font-semibold text-gray-lightest text-sm">{pokemon.type}</h4>
                  <h3 className="font-semibold text-white text-xl">{pokemon.name}</h3>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
