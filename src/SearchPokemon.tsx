import { useRef } from "react";
import "./SearchPokemon.css";
import { Pokemon } from "./types";

interface SearchPokemonProps {
  onSearch: (input: string | number) => void;
  onCatchPokemon: () => void;
  pokemon: Pokemon | null;
  isCatching: boolean;
  onNavigate: (direction: "next" | "previous") => void; // Nueva propiedad
}

function SearchPokemon({
  onSearch,
  onCatchPokemon,
  pokemon,
  isCatching,
  onNavigate,
}: SearchPokemonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current && inputRef.current.value) {
      const input = inputRef.current.value;
      onSearch(input.toLowerCase());
      inputRef.current.value = "";
    }
  };

  const handleNavigate = (direction: "next" | "previous") => {
    onNavigate(direction);
  };

  let pokemonName;
  if (pokemon) {
    pokemonName =
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1).toLowerCase();
  }

  return (
    <div className="container">
      {isCatching && (
        <div className="gif-container">
          <img src="/img/pokeball-removebg-preview.png" alt="catching" />
        </div>
      )}
      <div className="search-container">
        <input
          type="text"
          className="search-pokemon"
          placeholder="Ingrese Número o Nombre"
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
            <img
              src={
                pokemon.sprites.other.dream_world.front_default
                  ? pokemon.sprites.other.dream_world.front_default
                  : pokemon.sprites.other["official-artwork"].front_default
              }
              alt={pokemon.name}
              className="pokemon-img"
            />
          </>
        ) : (
          <div>Loading Pokemon...</div>
        )}
      </div>
      <div className="pokedex-container">
        <button className="add-pokedex" onClick={onCatchPokemon}>
          <img
            src="/img/pokeball-removebg-preview.png"
            alt="pokeball-button"
            className="pokeball-btn"
          />
          Capture
        </button>
      </div>
      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={() => handleNavigate("previous")}
          disabled={!pokemon} // Desactivar si no hay Pokémon
        >
          <img src="/img/left-arrow.svg" alt="left-arrow" />
        </button>
        <button
          className="nav-button"
          onClick={() => handleNavigate("next")}
          disabled={!pokemon} // Desactivar si no hay Pokémon
        >
          <img src="/img/right-arrow.svg" alt="right-arrow" />
        </button>
      </div>
    </div>
  );
}

export default SearchPokemon;
