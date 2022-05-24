import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Customers from "./Components/customers";
import LoginForm from "./Components/loginForm";
import MovieForm from "./Components/movieForm";
import Movies from "./Components/movies";
import NavBar from "./Components/navBar";
import NotFound from "./Components/notFound";
import Rentals from "./Components/rentals";

function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
