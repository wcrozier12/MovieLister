import React from "react";
import "./AddMovieForm.css";

const AddMovieForm = props => {
  console.log(props.searchFields.movieSearchTerm);
  return (
      <form className="form-inline my-2 my-lg-0">
        <select
          className="InputElement"
          onChange={event => props.changed(event, "movieType")}
        >
          <option value="new">New Movie</option>
          <option value="classic">Classic Movie</option>
        </select>
        <div className="Input">
          <input
            className="InputElement"
            type="text"
            placeholder="Add Movie.."
            value={props.searchFields.movieSearchTerm.value}
            onChange={event => props.changed(event, "movieSearchTerm")}
          />
        </div>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          onClick={props.clicked}
        >
          Add
        </button>
      </form>
  );
};

export default AddMovieForm;
