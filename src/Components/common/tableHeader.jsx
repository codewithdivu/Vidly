import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const sortColumns = { ...sortColumn };
    if (sortColumns.path === path) {
      sortColumns.order = sortColumns.order === "asc" ? "desc" : "asc";
    } else {
      sortColumns.path = path;
      sortColumns.order = "asc";
    }

    onSort(sortColumns);
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
