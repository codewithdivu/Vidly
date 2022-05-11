import React, { useState, useEffect } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";

const Movies = () => {
  const [movies, setMovies] = useState("");
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const genre = [{ name: "All Genres" }, ...getGenres()];

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

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;
  const allMovies = paginate(filtered, currentPage, pageSize);

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
        <h3>there is {filtered.length} in the Database </h3>
        <table className="table">
          <thead>
            <tr>
              <th>title</th>
              <th>genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allMovies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} onClick={() => handleLike(movie)} />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-danger btn-sm-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handleOnPageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
