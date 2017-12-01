import React from 'react';
import MovieCard from './MovieCard/MovieCard';
import Aux from '../HOCs/Aux';

const MovieHolder = (props) => {
  return (
    <div className='col-md-4'>
      <h1> {props.header} </h1>
      <div className='MovieHolder'>
      {props.movies.map((movie, i) => {
        return <MovieCard key={movie._id} title={movie.title} image={movie.poster} plot={movie.plot} ratings={movie.ratings} />
      })}
      </div>
    </div>
  )
}

export default MovieHolder;