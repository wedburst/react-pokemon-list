import { pokemonApi } from "../api/pokemonApi";
import {
  fetchAllPokemonResponse,
  Pokemon,
  SmallPokemon,
} from "../interfaces/fetchAllPokemonResponse";
// paso 3 hacer el fetch del pokemon con el archivo api

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  const resp = await pokemonApi.get<fetchAllPokemonResponse>(
    "/pokemon?limit=1550"
  );

  const smallPokemonList = resp.data.results;

  console.log(resp);

  return transformSmallPokemonIntoPokemon(smallPokemonList);
};

const transformSmallPokemonIntoPokemon = (
  smallPokemonList: SmallPokemon[]
): Pokemon[] => {
  const pokemonArr = smallPokemonList.map((poke) => {
    const pokeArr = poke.url.split("/");
    // console.log(pokeArr);
    const id = pokeArr[6];
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return {
      id: id,
      pic: pic,
      name: poke.name,
    };
  });

  // console.log(pokemonArr);

  return pokemonArr;
};
