import React, { useMemo, useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { Loading } from "../components/Loading";
import DataTable from "react-data-table-component";
import { TableMessage } from "../helpers/TableMessage";

export const HomePage = () => {
  const { isLoading, pokemons } = usePokemon();

  // paginacion
  const [currentPage, setcurrentPage] = useState(0);

  // Buscador
  const [search, setSearch] = useState("");

  const filteredItems = pokemons.filter((poke) => poke.name.includes(search));

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
        noDataComponent={<TableMessage />}
      />
      {isLoading && <Loading />}
    </div>
  );
};

// https://www.npmjs.com/package/react-data-table-component
// https://jbetancur.github.io/react-data-table-component/?path=/story/examples-filtering--filtering
