import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = ({ match }) => {
  const param = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>MovieForm {param.id}</h1>
      <button className="btn btn-primary" onClick={() => navigate("/movies")}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
