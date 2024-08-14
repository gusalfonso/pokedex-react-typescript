import "./PokemonCard.css";
import { CardProps } from "../../types";

function PokemonCard({ pokemon, onRemovePokemon }: CardProps) {
  return (
    <article key={pokemon.id} className="pokemon-card">
      <h2>
        {pokemon.name.charAt(0).toUpperCase() +
          pokemon.name.slice(1).toLowerCase()}
      </h2>
      <img
        src={
          pokemon.sprites.other.dream_world.front_default
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.other["official-artwork"].front_default
        }
        alt={pokemon.name}
      />
      <button className="remove" onClick={() => onRemovePokemon(pokemon.id)}>
        <img src="/img/trash.svg" alt="drop" />
        Drop
      </button>
    </article>
  );
}

export default PokemonCard;
