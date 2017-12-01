import React from 'react';

const AddMovieForm = (props) => {
  return (
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Add Movie.." value={props.empty} onChange={(event) => props.changed(event)}></input>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={props.clicked} >Add</button>
        </form>
  )
}

export default AddMovieForm;