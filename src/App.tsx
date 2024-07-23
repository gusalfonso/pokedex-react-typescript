import { Route, Routes } from "react-router-dom";
import Pokedex from "./Pokedex";
import SearchPokemon from "./SearchPokemon";
import { useEffect, useState } from "react";
import "./App.css";
import { fetchPokemonByNumberOrName } from "./services/services";
import PokemonStats from "./PokemonStats";
import NavBarBtn from "./NavBarBtn";
import { Pokemon } from "./types.ts";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [currentPokemonId, setCurrentPokemonId] = useState<number>(1);
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [isCatching, setIsCatching] = useState<boolean>(false); // Estado para el modal

  const handleSearch = async (input: string | number) => {
    let id: number | null = 1;
    let name: string | null = null;

    if (typeof input === "number") {
      id = input;
    } else {
      name = (input as string).toLowerCase();
    }

    try {
      const data = await fetchPokemonByNumberOrName(name || id);
      setPokemon(data);
      if (id) {
        setCurrentPokemonId(id);
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemon(null);
    }
  };

  const handleCatchPokemon = () => {
    if (pokemon) {
      const alreadyInPokedex = pokedex.some((poke) => poke.id === pokemon.id);
      if (!alreadyInPokedex) {
        setIsCatching(true);
        setPokedex([...pokedex, pokemon]);
        setTimeout(() => setIsCatching(false), 1000);
      } else {
        alert(
          `${
            pokemon.name.charAt(0).toUpperCase() +
            pokemon.name.slice(1).toLowerCase()
          } ya está en el Pokedex`
        );
      }
    }
  };

  const handleNavigate = (direction: "next" | "previous") => {
    if (!pokemon) return;

    let nextId: number;
    if (direction === "next") {
      nextId = pokemon.id + 1;
    } else {
      nextId = pokemon.id - 1;
    }

    if (nextId < 1) nextId = 1;
    if (nextId > 1025) nextId = 1025;

    setCurrentPokemonId(nextId);
  };

  const handleRemovePokemon = (id: number) => {
    setPokedex(pokedex.filter((poke) => poke.id !== id));
  };

  useEffect(() => {
    fetchPokemonByNumberOrName(currentPokemonId).then((data) => {
      setPokemon(data);
    });
  }, [currentPokemonId]);

  console.log(pokemon);

  return (
    <>
      <header>
        <li>
          <NavBarBtn to="/" title="Search" icon="/public/img/search.svg" />
        </li>
        <li>
          <NavBarBtn
            to="/pokedex"
            title="Pokedex"
            icon="/public/img/pokedex.svg"
          />
        </li>
        <li>
          <NavBarBtn to="/stats" title="Stats" icon="/public/img/stats.svg" />
        </li>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <SearchPokemon
              onSearch={handleSearch}
              onCatchPokemon={handleCatchPokemon}
              pokemon={pokemon}
              isCatching={isCatching}
              onNavigate={handleNavigate}
            />
          }
        />
        <Route
          path="/pokedex"
          element={
            <Pokedex pokedex={pokedex} onRemovePokemon={handleRemovePokemon} />
          }
        />
        <Route path="/stats" element={<PokemonStats pokemon={pokemon} />} />
      </Routes>
    </>
  );
}

export default App;
