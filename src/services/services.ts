export async function fetchPokemonByNumberOrName(num: string | number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
  if (!res.ok) {
    alert("El pokemon no se encuentra, intenta con el nombre o un número");
  }
  return res.json();
}
