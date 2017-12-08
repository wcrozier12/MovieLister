import React from 'react';
import './MovieCard.css';


const MovieCard = ({ title, plot, image, watched, markAsWatched, deleteMovie, ratings, active }) => {
  return (
    <div className={`carousel-item ${active}`}>
      <div className='Card container'>
        <div className='row CardHeader'>
          <div className='col-md-12'>
            <h2 className='Title'> {title.toUpperCase()} </h2>
          </div>
        </div>
          <div className='row'>
            {ratings.map(rating => {
              return <div className='col-md-4 Rating' key={rating.Source}> {rating.Source} {rating.Value} </div>
            })}
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <img className='MoviePoster d-block' src={image} alt='movie' />
            </div>
            <div className='col-md-8'>
              <p className='Plot'> {plot} </p>
            </div>
          </div>
          {!watched ? <button className='btn watchedButton' name={title} type='submit' onClick={(e) => markAsWatched(e)}> Mark as watched </button> : null}
          <button className='btn btn-danger' name={title} onClick={() => deleteMovie(title)}> Delete Movie</button>
      </div>
    </div>
  )
}

export default MovieCard;
