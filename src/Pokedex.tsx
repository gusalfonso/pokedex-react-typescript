import "./Pokedex.css";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  name: string;
  id: number;
  sprites: { front_default: string };
}

interface PokedexProps {
  pokedex: Pokemon[];
  onRemovePokemon: (id: number) => void;
}

function Pokedex({ pokedex, onRemovePokemon }: PokedexProps) {
  return (
    <>
      <h1 className="titulo">Pokedex</h1>
      <div className="pokedex-grid">
        {pokedex.length === 0 ? (
          <p>No has atrapado ningún Pokémon</p>
        ) : (
          pokedex.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon}
              onRemovePokemon={onRemovePokemon}
            ></PokemonCard>
          ))
        )}
      </div>
    </>
  );
}

export default Pokedex;
