export interface EvolutionStep {
  species_name: string;
  chain: null | EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export interface SpeciesAPIResponse {
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChainAPIResponse {
  chain: EvolutionChainLink;
}

export interface Pokemon {
  name: string;
  image: string;
  weight: number;
  height: number;
  types: string[];
  speed: number;
  defense: number;
  attack: number;
  hp: number;
  evolution_steps: string[];
  id: number;
  sprites: {
    other: {
      dream_world: { front_default: string };
      "official-artwork": { front_default: string };
    };
    front_default: string;
    front_shiny: string;
  };
}

export interface BtnProps {
  icon?: string;
  title: string;
  to: string;
}

export interface PokemonStatsProps {
  pokemon: Pokemon | null;
}

export interface PokedexProps {
  pokedex: Pokemon[];
  onRemovePokemon: (id: number) => void;
}

export interface HorizontalBarChartProps {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    weight: number;
    height: number;
  };
}
