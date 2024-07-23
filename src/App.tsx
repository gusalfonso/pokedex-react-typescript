import { Link, Route, Routes } from "react-router-dom";
import Pokedex from "./Pokedex";
import SearchPokemon from "./SearchPokemon";
import { useEffect, useState } from "react";
import "./App.css";
import { fetchPokemonByNumberOrName } from "./services/services";
import PokemonStats from "./PokemonStats";

interface Pokemon {
  name: string;
  id: number;
  sprites: { front_default: string };
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [searchInput, setSearchInput] = useState<number | string>(1);
  const [pokedex, setPokedex] = useState<Pokemon[]>([]);
  const [isCatching, setIsCatching] = useState<boolean>(false); // Estado para el modal

  const handleSearch = (input: string | number) => {
    setSearchInput(input);
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

  const handleRemovePokemon = (id: number) => {
    setPokedex(pokedex.filter((poke) => poke.id !== id));
  };

  useEffect(() => {
    fetchPokemonByNumberOrName(searchInput).then((data) => {
      setPokemon(data);
    });
  }, [searchInput]);

  console.log(pokemon);

  return (
    <>
      <header>
        <li>
          <Link to="/">Search Pokemon</Link>
        </li>
        <li>
          <Link to="/pokedex">Pokedex</Link>
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
