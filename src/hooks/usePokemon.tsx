import { useEffect, useState } from "react";
import { fetchAllPokemons } from "../helpers/fetchAllPokemon";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

export const usePokemon = () => {
  const [isLoading, setIsLoading] = useState(true);

  // luego del fetchAllPokemons ponemos el arr de pokemon
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    // hacer la carga de pokemon
    fetchAllPokemons().then((pokemons) => {
      setIsLoading(false);
      setPokemons(pokemons);
    });
  }, []);

  return {
    isLoading,
    pokemons,
  };
};
