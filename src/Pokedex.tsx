import { useState } from "react";
import "./Pokedex.css";
import PokemonCard from "./PokemonCard";
import { PokedexProps } from "./types";

const ITEMS_PER_PAGE = 10;

function Pokedex({ pokedex, onRemovePokemon }: PokedexProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(pokedex.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPokemons = pokedex.slice(startIndex, endIndex);

  return (
    <>
      <h1 className="titulo">Pokedex</h1>

      {pokedex.length === 0 ? (
        <p>You haven't caught any Pokémon</p>
      ) : (
        <div className="pokedex-grid">
          {currentPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemovePokemon={onRemovePokemon}
            />
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </>
  );
}

export default Pokedex;
