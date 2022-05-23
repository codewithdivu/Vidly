import React, { useState, useEffect } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";

const Movies = () => {
  const [movies, setMovies] = useState("");
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    const genre = [{ _id: "", name: "All Genres" }, ...getGenres()];

    setMovies(getMovies());
    setGenres(genre);
  }, []);

  const handleDelete = (id) => {
    const result = movies.filter((m) => m._id !== id);
    setMovies(result);
  };

  const handleLike = (movie) => {
    // console.log("liked......", movie);
    const likedMovies = [...movies];
    const index = likedMovies.indexOf(movie);
    likedMovies[index] = { ...movies[index] };
    likedMovies[index].liked = !movies[index].liked;
    setMovies(likedMovies);
  };

  const handleOnPageChange = (page) => {
    setCurrentPage(page);
    // console.log("page", page);
  };

  const handleGenreSelect = (genre) => {
    // console.log("genre :>> ", genre);
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSort = (sortColumns) => {
    // setSortColumn({ path, order: "asc" });

    setSortColumn(sortColumns);
  };

  const getPagedData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const allMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: allMovies };
  };

  const { totalCount, data: allMovies } = getPagedData();

  return movies.length === 0 ? (
    <h1>there is no movies in the database</h1>
  ) : (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
        />
      </div>
      <div className="col">
        <h3>there is {totalCount} in the Database </h3>
        <MoviesTable
          allMovies={allMovies}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handleOnPageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
