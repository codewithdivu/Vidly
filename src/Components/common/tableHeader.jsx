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

  const renderSortIcons = (column) => {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc" />;
    }
    return <i className="fa fa-sort-desc" />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            style={{ cursor: "pointer" }}
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcons(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
