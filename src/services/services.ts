import {
  Pokemon,
  EvolutionChainLink,
  PokemonAPIResponse,
  SpeciesAPIResponse,
  EvolutionChainAPIResponse,
} from "../types";

const API_URL = "https://pokeapi.co/api/v2";

const fetchPokemonByNumberOrName = async (
  id: number | string
): Promise<Pokemon> => {
  // Obtener datos básicos del Pokémon
  const response = await fetch(`${API_URL}/pokemon/${id}`);
  const data: PokemonAPIResponse = await response.json();

  // Obtener cadena de evolución
  const speciesResponse = await fetch(data.species.url);
  const speciesData: SpeciesAPIResponse = await speciesResponse.json();
  const evolutionResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionChain: EvolutionChainAPIResponse =
    await evolutionResponse.json();

  // Función para extraer los pasos de evolución
  function getEvolutionSteps(chain: EvolutionChainLink | null): string[] {
    const steps: string[] = [];
    let currentChain = chain;

    while (currentChain) {
      const step = currentChain.species.name;
      steps.push(step);
      currentChain =
        currentChain.evolves_to.length > 0 ? currentChain.evolves_to[0] : null;
    }
    return steps;
  }

  // Mapear datos a la interfaz de Pokémon
  const pokemon: Pokemon = {
    name: data.name,
    id: data.id,
    image: data.sprites.front_default,
    height: data.height,
    weight: data.weight,
    types: data.types.map((type) => type.type.name),
    speed: data.stats.find((stat) => stat.stat.name === "speed")!.base_stat,
    defense: data.stats.find((stat) => stat.stat.name === "defense")!.base_stat,
    attack: data.stats.find((stat) => stat.stat.name === "attack")!.base_stat,
    hp: data.stats.find((stat) => stat.stat.name === "hp")!.base_stat,
    evolution_steps: getEvolutionSteps(evolutionChain.chain),
    sprites: {
      other: {
        dream_world: data.sprites.other.dream_world,
        "official-artwork": data.sprites.other["official-artwork"],
      },
      front_default: data.sprites.front_default,
      front_shiny: data.sprites.front_shiny,
    },
  };

  return pokemon;
};

export { fetchPokemonByNumberOrName };
