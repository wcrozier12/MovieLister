import React from 'react';
import './MovieCard.css';


const MovieCard = ({ title, plot, image, watched, markAsWatched}) => {
  return (
    <div className='Card'>
      <div className='row'>
        <div className='col-md-10'>
          <h3> {title} </h3>
        </div>
        <div className='col-sm-2'>
          <button type="button" style={{paddingRight: '10px'}} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
        <img className='MoviePoster' src={image} alt='movie' />
        <p> {plot} </p>
        {!watched ? <button className='btn' name={title} type='submit' onClick={(e) => markAsWatched(e)}> Mark as watched </button> : null}
    </div>
  )
}

export default MovieCard;