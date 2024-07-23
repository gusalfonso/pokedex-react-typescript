import { useRef } from "react";
import "./SearchPokemon.css";
import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  id: number;
  sprites: { front_default: string };
}

interface SearchPokemonProps {
  onSearch: (input: string | number) => void;
  onCatchPokemon: () => void;
  pokemon: Pokemon | null;
  isCatching: boolean;
}

function SearchPokemon({
  onSearch,
  onCatchPokemon,
  pokemon,
  isCatching,
}: SearchPokemonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value) {
      const input = inputRef.current.value;
      onSearch(input.toLowerCase());
      inputRef.current.value = "";
    }
  };

  let pokemonName;
  if (pokemon) {
    pokemonName =
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1).toLowerCase();
  }

  return (
    <div className="container">
      {isCatching ? (
        <div className="gif-container">
          <img src="/public/gif/pokeball-removebg-preview.png" alt="catching" />
        </div>
      ) : (
        ""
      )}
      <div className="search-container">
        <input
          type="text"
          className="search-pokemon"
          placeholder="Ingrese Numero o Nombre"
          ref={inputRef}
        />
        <button type="submit" id="searchBtn" onClick={handleClick}>
          Buscar
        </button>
      </div>
      <div className="pokemon-resume">
        {pokemon ? (
          <>
            <div className="pokemon-name">
              <span>{pokemon.id}</span>
              <h1>{pokemonName}</h1>
            </div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </>
        ) : (
          <div>Loading Pokemon...</div>
        )}
      </div>
      <div className="pokedex-container">
        <span>
          <strong>Atrapar pokemon</strong>
        </span>
        <button className="add-pokedex" onClick={onCatchPokemon}>
          +
        </button>
        <Link to="/stats">View Stats</Link>
      </div>
    </div>
  );
}

export default SearchPokemon;
