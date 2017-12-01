import React from 'react';
import './MovieCard.css';


const MovieCard = (props) => {
  return (
    <div className='Card'>
      <h3> {props.title} </h3>
        <img className='MoviePoster' src={props.image} alt='movie' />
        <p> {props.plot} </p>
    </div>
  )
}

export default MovieCard;