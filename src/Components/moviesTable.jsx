import React from "react";
import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = ({ allMovies, onLike, onDelete, onSort, sortColumn }) => {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie._id)}
          className="btn btn-danger btn-sm-2"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
      data={allMovies}
    />
  );
};

export default MoviesTable;
