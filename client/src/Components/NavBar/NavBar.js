import React from 'react';
import AddMovieForm from './AddMovieForm/AddMovieForm';
import './NavBar.css';

const NavBar = (props) => {
  return(
  <nav className="navbar bg-faded navbar-toggleable-md NavBar">
    <a className="navbar-brand" href="/">Navbar</a>
    <AddMovieForm changed={props.changed} clicked={props.clicked} empty={props.emptyForm} />
  </nav>
  )
}

export default NavBar;