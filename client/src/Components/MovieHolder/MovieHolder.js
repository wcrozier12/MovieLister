import React from 'react';
import MovieCard from './MovieCard/MovieCard';

const MovieHolder = (props) => {
  return (
    <div className='row'>
      <h1 style={{color:'white', fontFamily:'Monoton'}}> {props.header} </h1>
      <div id={props.id} className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
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
          <a className="carousel-control-prev" href={`#${props.id}`} role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href={`#${props.id}`} role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MovieHolder;