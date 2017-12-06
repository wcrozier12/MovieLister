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
      newMovies: [],
      classicMovies: [],
      watchedMovies: [],
      movieSearch: '',
      viewingModal: false
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
        movieSearch: ''
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
      console.log(res);
      this.handleGettingMovies();
    })
  }
  render() {
    return(
      <Aux>
        <NavBar changed={this.handleSearchInput} clicked={this.searchMovieHandler} emptyForm={this.state.movieSearch}/>
        <div className='row MovieSectionContainer'>
          <MovieHolder header={'New Movies'} movies={this.state.newMovies} markAsWatched={this.markAsWatchedHandler}/>
          <MovieHolder header={'Classics'} movies={this.state.classicMovies} markAsWatched={this.markAsWatchedHandler}/>
          <MovieHolder header={'History'} movies={this.state.watchedMovies} markAsWatched={this.markAsWatchedHandler}/>
        </div>
      </Aux>
    )
  }
}
export default Layout;