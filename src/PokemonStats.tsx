import { useEffect, useState } from "react";
import "./PokemonStats.css";
import { fetchPokemonByNumberOrName } from "./services/services";

interface Pokemon {
  name: string;
  id: number;
  sprites: { front_default: string };
}

interface PokemonStatsProps {
  pokemon: Pokemon | null;
}

function PokemonStats({ pokemon }: PokemonStatsProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(pokemon);

  useEffect(() => {
    if (pokemon === null) {
      fetchPokemonByNumberOrName(1).then((data) => {
        setPokemonData(data);
      });
    } else {
      setPokemonData(pokemon);
    }
  }, [pokemon]);

  if (!pokemonData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{pokemonData.name}</h1>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>ID: {pokemonData.id}</p>
    </div>
  );
}

export default PokemonStats;
