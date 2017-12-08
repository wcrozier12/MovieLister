import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar/NavBar';
import Aux from '../Components/HOCs/Aux';
import MovieHolder from '../Components/MovieHolder/MovieHolder';
import './Layout.css';

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newMovies:[],
      classicMovies: [],
      watchedMovies: [],
      movieSearch: '',
      viewingModal: false,
      resetCarousel: false,
    }
  }
  
  componentDidMount() {
    this.handleGettingMovies();
  }

  handleGettingMovies = () => {
    axios.get('/api/movies')
    .then((res) => {
      const newMovies=res.data.filter(movie => !movie.classic && !movie.watched)
      const classicMovies=res.data.filter(movie => movie.classic && !movie.watched)
      const watchedMovies = res.data.filter(movie => movie.watched)
      this.setState({
        newMovies,
        classicMovies,
        watchedMovies,
        movieSearch: '',
        resetCarousel: false
      })
    })
  }

  handleSearchInput = (event) => {
    event.preventDefault();
    this.setState({movieSearch: event.target.value})
  }
  searchMovieHandler = (e) => {
    e.preventDefault();
    const title = this.state.movieSearch;
    const data = {};
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=7d3e7708&t=' + title)
    .then((res) => {
      data.title = res.data.Title;
      data.plot = res.data.Plot;
      data.ratings = res.data.Ratings;
      data.poster = res.data.Poster;
      return axios.post('/newMovie', data)
    })
    .then((res) => {
      this.handleGettingMovies();
    })
  }

  markAsWatchedHandler = (e) => {
     const title = e.target.name;
    axios.put('/updateMovie/' + title)
    .then(res => {
      this.setState({resetCarousel: true})
      this.handleGettingMovies();
    })
  }

  deleteMovieHandler = (title) => {
    axios.delete('/deleteMovie/' + title)
    .then(res => {
      this.setState({resetCarousel: true})
      this.handleGettingMovies();
    })
  }

  render() {
    let welcomeMessage = <p className='WelcomeMessage'>Your list is empty.</p>
    if (this.state.classicMovies.length !== 0 || this.state.newMovies.length !== 0) {         
      welcomeMessage = null;
    }
    let newMovies = '';
    let classicMovies = '';
    let watchedMovies = '';
    
    this.state.newMovies.length!==0 ? newMovies=<MovieHolder header={'New Movies'} reset={this.state.resetCarousel} id={'newMovies'} movies={this.state.newMovies} markAsWatched={this.markAsWatchedHandler} deleteMovie={this.deleteMovieHandler}/> : null;
    this.state.classicMovies.length!==0 ? classicMovies=<MovieHolder header={'Classics'} reset={this.state.resetCarousel} id='classics' movies={this.state.classicMovies} markAsWatched={this.markAsWatchedHandler} deleteMovie={this.deleteMovieHandler}/>
 : null;
    this.state.watchedMovies.length!==0 ? watchedMovies=<MovieHolder header={'History'} reset={this.state.resetCarousel} id={'history'} movies={this.state.watchedMovies} markAsWatched={this.markAsWatchedHandler} deleteMovie={this.deleteMovieHandler}/>
 : null;

    return(
      <div className='Layout'>
        <NavBar changed={this.handleSearchInput} clicked={this.searchMovieHandler} emptyForm={this.state.movieSearch}/>
          <div className='MovieSectionContainer'>
            {newMovies}
            {classicMovies}
            {watchedMovies}
        </div>
      </div>
    )
  }
}
export default Layout;