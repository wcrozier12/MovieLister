import React, { Component } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar/NavBar";
import MovieHolder from "../Components/MovieHolder/MovieHolder";
import "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { title: "New Movies", id: "newMovies", movies: [] },
        { title: "Classic Movies", id: "classics", movies: [] },
        { title: "History", id: "history", movies: [] }
      ],
      searchFields: {
        movieSearchTerm: {
          type: "input",
          value: ""
        },
        movieType: {
          type: "select",
          value: "new"
        }
      },
      viewingModal: false,
      resetCarousel: false
    };
  }

  componentDidMount() {
    this.handleGettingMovies();
  }

  handleGettingMovies = () => {
    axios.get("/api/movies").then(res => {
      const newMovies = res.data.filter(
        movie => !movie.classic && !movie.watched
      );
      const classicMovies = res.data.filter(
        movie => movie.classic && !movie.watched
      );
      const watchedMovies = res.data.filter(movie => movie.watched);

      const categories = [...this.state.categories];
      categories[0].movies = newMovies;
      categories[1].movies = classicMovies;
      categories[2].movies = watchedMovies;
      const resetSearchFields = {
        ...this.state.searchFields
      };
      const resetMovieSearch = {
        ...resetSearchFields["movieSearchTerm"],
        value: ""
      };
      resetSearchFields["movieSearchTerm"] = resetMovieSearch;
      this.setState({
        categories,
        searchFields: resetSearchFields,
        resetCarousel: false
      });
    });
  };

  handleSearchInput = (event, elementId) => {
    event.preventDefault();
    const updatedSearchForm = {
      ...this.state.searchFields
    };
    const updatedElement = {
      ...updatedSearchForm[elementId]
    };
    updatedElement.value = event.target.value;
    updatedSearchForm[elementId] = updatedElement;
    this.setState({ searchFields: updatedSearchForm });
  };
  searchMovieHandler = e => {
    e.preventDefault();
    const title = this.state.searchFields.movieSearchTerm.value;
    const data = {};
    data.classic =
      this.state.searchFields.movieType.value === "classic" ? true : false;
    axios
      .get("https://www.omdbapi.com/?i=tt3896198&apikey=7d3e7708&t=" + title)
      .then(res => {
        data.title = res.data.Title;
        data.plot = res.data.Plot;
        data.ratings = res.data.Ratings;
        data.poster = res.data.Poster;
        return axios.post("/newMovie", data);
      })
      .then(res => {
        this.handleGettingMovies();
      });
  };

  markAsWatchedHandler = e => {
    const title = e.target.name;
    axios.put("/updateMovie/" + title).then(res => {
      this.setState({ resetCarousel: true });
      this.handleGettingMovies();
    });
  };

  deleteMovieHandler = title => {
    axios.delete("/deleteMovie/" + title).then(res => {
      this.setState({ resetCarousel: true });
      this.handleGettingMovies();
    });
  };

  render() {
    const categories = this.state.categories.map((category, i) => {
      return (
        <MovieHolder
          key={category.id}
          header={category.title}
          numOfMovies={category.movies.length}
          reset={this.state.resetCarousel}
          id={category.id}
          movies={category.movies}
          markAsWatched={this.markAsWatchedHandler}
          deleteMovie={this.deleteMovieHandler}
        />
      );
    });
    return (
      <div className="Layout">
        <NavBar
          changed={this.handleSearchInput}
          clicked={this.searchMovieHandler}
          searchFields={this.state.searchFields}
        />
        <div className="MovieSectionContainer">{categories}</div>
      </div>
    );
  }
}
export default Layout;
