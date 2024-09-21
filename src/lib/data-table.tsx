import React, { useState, useMemo } from "react";
import { Column } from "./types";

interface DataTableProps {
  columns: Column[];
  data: Record<string, string | number>[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (field: string) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Filtrage des données en fonction de la recherche
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((col) =>
        row[col.field]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, columns]);

  // Tri des données
  const sortedData = useMemo(() => {
    if (sortField && sortOrder) {
      return [...filteredData].sort((a, b) => {
        const aValue = a[sortField].toString();
        const bValue = b[sortField].toString();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }
    return filteredData;
  }, [filteredData, sortField, sortOrder]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  return (
    <div>
      {/* Affichage du nombre d'entrées et recherche avec labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div>
          <label htmlFor="rowsPerPage">
            Show entries:
            <select
              id="rowsPerPage"
              name="rowsPerPage"
              value={rowsPerPage}
              aria-label="Select number of entries to show"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              style={{ marginLeft: "5px" }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor="searchTerm">
            Search:
            <input
              type="text"
              value={searchTerm}
              id="searchTerm"
              name="searchTerm"
              title="Enter search term here"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginLeft: "5px" }}
            />
          </label>
        </div>
      </div>

      {/* Tableau */}
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.field as string}
                style={{
                  padding: "10px",
                  borderBottom: "2px solid #ccc",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort(col.field)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {col.title}
                  <div
                    style={{
                      marginLeft: "8px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        color:
                          sortField === col.field && sortOrder === "asc"
                            ? "black"
                            : "gray",
                      }}
                    >
                      ▲
                    </span>
                    <span
                      style={{
                        color:
                          sortField === col.field && sortOrder === "desc"
                            ? "black"
                            : "gray",
                      }}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <MemoizedTableRow
              key={index}
              row={row}
              columns={columns}
              index={index}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <button
          onClick={() => paginate(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div>
          {Array.from(Array(totalPages), (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              style={{
                margin: "0 5px",
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Composant optimisé avec React.memo pour éviter les re-rendus inutiles
const TableRow: React.FC<{
  row: Record<string, string | number>;
  columns: Column[];
  index: number;
}> = ({ row, columns, index }) => (
  <tr style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
    {columns.map((col) => (
      <td
        key={col.field as string}
        style={{
          padding: "10px",
          borderBottom: "1px solid #ddd",
          textAlign: "center",
        }}
      >
        {row[col.field]}
      </td>
    ))}
  </tr>
);

// Utilisation de React.memo pour éviter les re-rendus
const MemoizedTableRow = React.memo(TableRow);

export default DataTable;
