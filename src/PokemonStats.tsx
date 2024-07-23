import { useEffect, useState } from "react";
import "./PokemonStats.css";
import { fetchPokemonByNumberOrName } from "./services/services";
import { Pokemon, PokemonStatsProps } from "./types";
import HorizontalBarChart from "./RadarChart";

function PokemonStats({ pokemon }: PokemonStatsProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(pokemon);
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (pokemon === null) {
      fetchPokemonByNumberOrName(1).then((data) => {
        setPokemonData(data);
      });
    } else {
      setPokemonData(pokemon);
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemonData && pokemonData.evolution_steps.length > 0) {
      const loadEvolutions = async () => {
        const evolutionPromises = pokemonData.evolution_steps.map((evol) =>
          fetchPokemonByNumberOrName(evol)
        );
        const evolutionsData = await Promise.all(evolutionPromises);
        setEvolutions(evolutionsData);
      };
      loadEvolutions();
    }
  }, [pokemonData]);

  if (!pokemonData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="stats-container">
      <div className="img-stats-container">
        <div className="pokemon-card-stats">
          <h1>
            {pokemonData.name.charAt(0).toUpperCase() +
              pokemonData.name.slice(1).toLowerCase()}
          </h1>
          <img
            src={
              pokemonData.sprites.other.dream_world.front_default
                ? pokemonData.sprites.other.dream_world.front_default
                : pokemonData.sprites.other["official-artwork"].front_default
            }
            alt={pokemonData.name}
          />
          <div className="pokemon-types">
            {pokemonData.types.map((type, index) => (
              <span key={index} className={`type-sticker type-${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="pokemon-stats">
          <HorizontalBarChart
            stats={{
              hp: pokemonData.hp,
              attack: pokemonData.attack,
              defense: pokemonData.defense,
              speed: pokemonData.speed,
              weight: pokemonData.weight,
              height: pokemonData.height,
            }}
          />
        </div>
      </div>
      <div className="pokemon-evolutions">
        <h2>Evolution Steps</h2>
        <div className="evolutions-container">
          {evolutions.length > 0 ? (
            evolutions.map((step, index) => (
              <div key={index} className="pokemon-card-stats">
                <h3>
                  {step.name.charAt(0).toUpperCase() +
                    step.name.slice(1).toLowerCase()}
                </h3>
                <img
                  src={
                    step.sprites.other.dream_world.front_default
                      ? step.sprites.other.dream_world.front_default
                      : step.sprites.other["official-artwork"].front_default
                  }
                  alt={step.name}
                />
              </div>
            ))
          ) : (
            <li>No hay pasos de evolución disponibles.</li>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonStats;
