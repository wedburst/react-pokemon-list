import React, { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { Loading } from "../components/Loading";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";
import DataTable from "react-data-table-component";

const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <input
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button type="button" onClick={onClear}>
      X
    </button>
  </>
);

export const HomePage = () => {
  /* 
    DATA TABLE REACT FILTERING
  */
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  /* 
    DATA TABLE REACT FILTERING FIN
  */

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        border: "1px solid #ccc",
        borderSpacing: "0",
        borderCollapse: "collapse",
        borderRightWidth: "0",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        background: "#0079bf",
        color: "white",
        fontSize: "13px",
        fontWeight: "600",
        fontFamily: "open sans, helvetica neue, Helvetica, Arial, sans-serif",
        border: "1px solid #ccc",
        borderRightWidth: "0",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        border: "1px solid #ccc",
        borderLeftWidth: "0",
        borderTopWidth: "0",
        borderBottomWidth: "0",
      },
    },
  };
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      center: true,
    },
    {
      name: "Nombre Pokemon",
      selector: "name",
      sortable: true,
      center: true,
    },
    {
      name: "Foto",
      selector: "pic",
      sortable: true,
      center: true,
      cell: (row: any) => (
        <div>
          <img src={row.pic} alt={row.name} />
        </div>
      ),
    },
  ];

  const { isLoading, pokemons } = usePokemon();

  // paginacion
  const [currentPage, setcurrentPage] = useState(0);

  // Buscador
  const [search, setSearch] = useState("");

  // const filteredPokemon = (): Pokemon[] => {
  //   // filtrode busqueda
  //   if (search.length === 0)
  //     return pokemons.slice(currentPage, currentPage + 5);

  //   // si hay algo en la caja de texto

  //   const filtered = pokemons.filter((poke) => poke.name.includes(search));
  //   return filtered.slice(currentPage, currentPage + 5);
  // };
  const filteredItems = pokemons.filter((poke) => poke.name.includes(search));

  // const nextPage = () => {
  //   if (
  //     pokemons.filter((poke) => poke.name.includes(search)).length >
  //     currentPage + 5
  //   )
  //     setcurrentPage(currentPage + 5);
  // };

  // const prevPage = () => {
  //   if (currentPage > 0) setcurrentPage(currentPage - 5);
  // };

  const handleSearch = ({ target }: any) => {
    setcurrentPage(0);
    setSearch(target.value);
  };

  return (
    <div className="container mt-5">
      <h1>Listado de Pokémon</h1>
      <hr />
      <input
        type="text"
        className="mb-3 form-control"
        placeholder="Buscar Pokémon"
        value={search}
        onChange={handleSearch}
      />
      {/* <div>
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
      </table> */}
      <DataTable
        title="Presentación"
        columns={columns}
        data={filteredItems}
        customStyles={customStyles}
        noHeader={true}
        progressPending={isLoading}
        striped={true}
        highlightOnHover={true}
        pagination
      />
      {isLoading && <Loading />}
    </div>
  );
};

// https://www.npmjs.com/package/react-data-table-component
