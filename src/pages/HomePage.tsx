import React, { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { Loading } from "../components/Loading";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

export const HomePage = () => {
  const { isLoading, pokemons } = usePokemon();

  // paginacion
  const [currentPage, setcurrentPage] = useState(0);

  // Buscador
  const [search, setSearch] = useState("");

  const filteredPokemon = (): Pokemon[] => {
    // filtrode busqueda
    if (search.length === 0)
      return pokemons.slice(currentPage, currentPage + 5);

    // si hay algo en la caja de texto

    const filtered = pokemons.filter((poke) => poke.name.includes(search));
    return filtered.slice(currentPage, currentPage + 5);
  };

  const nextPage = () => {
    if (
      pokemons.filter((poke) => poke.name.includes(search)).length >
      currentPage + 5
    )
      setcurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    if (currentPage > 0) setcurrentPage(currentPage - 5);
  };

  const handleSearch = ({ target }: any) => {
    setcurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div className="container mt-5">
      <h1>Listado de Pokémon</h1>
      <hr />
      <div>
        <input
          type="text"
          className="mb-3 form-control"
          placeholder="Buscar Pokémon"
          value={search}
          onChange={handleSearch}
        />
        <button onClick={prevPage} className="btn btn-secondary m-4">
          Anterior
        </button>
        <button onClick={nextPage} className="btn btn-primary">
          Siguiente
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: 100 }}>
              #
            </th>
            <th scope="col" style={{ width: 150 }}>
              Nombre
            </th>
            <th scope="col">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemon().map(({ id, name, pic }) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>
                <img
                  src={pic}
                  className="img-fluid"
                  style={{ width: "130px" }}
                  alt={name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <Loading />}
    </div>
  );
};
