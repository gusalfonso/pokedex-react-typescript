import "./PokemonCard.css";

interface Pokemon {
  name: string;
  id: number;
  sprites: { front_default: string };
}

interface PokedexProps {
  pokemon: Pokemon[];
  onRemovePokemon: (id: number) => void;
}

function PokemonCard({ pokemon, onRemovePokemon }: PokedexProps) {
  return (
    <article key={pokemon.id} className="pokemon-card">
      <h2>
        {pokemon.name.charAt(0).toUpperCase() +
          pokemon.name.slice(1).toLowerCase()}
      </h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <button className="remove" onClick={() => onRemovePokemon(pokemon.id)}>
        Drop
      </button>
    </article>
  );
}

export default PokemonCard;
