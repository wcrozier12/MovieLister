import React from 'react';
import MovieCard from './MovieCard/MovieCard';
import './MovieHolder.css';
import Aux from '../HOCs/Aux';

const MovieHolder = (props) => {
  return (
    <div className='container' >
      <div className='SectionHeader'>
        <h1 className='SectionTitle'> {props.header} </h1>
          {props.numOfMovies===0 ? 
            <div className='MessageContainer'><p className='NoMoviesMessage'>Your list is empty.</p></div> 
            : null}
      </div>
      <div className='container' style={{paddingBottom: '5%'}}>
        <div className='row'>
          <div id={props.id} className="carousel slide" data-interval='false'data-ride="carousel">
            <div className="carousel-inner" role="listbox">
          {props.movies.map((movie, i) => {
            let active = ' '; 
            if (!props.reset) {
              i===props.movies.length-1 ? active='active' : active='';
            }       
            return <MovieCard
                    active={active}
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
      </div>
    </div>
  )
}

export default MovieHolder;