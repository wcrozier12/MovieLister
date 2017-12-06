import React from 'react';
import MovieCard from './MovieCard/MovieCard';

const MovieHolder = (props) => {
  return (
    <div className='col-md-4'>
      <h1 style={{color:'white', fontFamily:'Monoton'}}> {props.header} </h1>
      <div className='MovieHolder'>
      {props.movies.map((movie, i) => {
        return <MovieCard 
                key={movie._id} 
                title={movie.title} 
                image={movie.poster} 
                plot={movie.plot} 
                ratings={movie.ratings} 
                watched={movie.watched}
                deleteMovie={props.deleteMovie} 
                markAsWatched={props.markAsWatched} />
      })}
      </div>
    </div>
  )
}

export default MovieHolder;