import React from 'react';
import './MovieCard.css';


const MovieCard = ({ title, plot, image, watched, markAsWatched, deleteMovie, ratings }) => {
  return (
    <div className='Card'>
      <div className='row'>
        <div className='col-md-10'>
          <h2 className='Title'> {title.toUpperCase()} </h2>
        </div>
        <div className='col-sm-2'>
          <button type="button" style={{paddingRight: '10px'}} className="close" onClick={() => deleteMovie(title)} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
        <img className='MoviePoster' src={image} alt='movie' />
        <div className='row'>
          {ratings.map(rating => {
            return <div className='col-md-4 Rating' key={rating.Source}> {rating.Source} {rating.Value} </div>
          })}
        </div>
        <p className='Plot'> {plot} </p>
        {!watched ? <button className='btn watchedButton' name={title} type='submit' onClick={(e) => markAsWatched(e)}> Mark as watched </button> : null}
    </div>
  )
}

export default MovieCard;