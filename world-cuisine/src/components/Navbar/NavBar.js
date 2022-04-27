import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css";

class NavBar extends React.Component{
  render(){
    return(
      <nav>
        <ul>
          <li><NavLink to="./search" className={({isActive}) => (isActive ? "selected" : "")}>Search</NavLink></li>
          <li><NavLink to="./favorites" className={({isActive}) => (isActive ? "selected" : "")}>Favorites</NavLink></li>
          <li><NavLink to="./create" className={({isActive}) => (isActive ? "selected" : "")}>Create Recipe</NavLink></li>
          <li><NavLink to="./metrics" className={({isActive}) => (isActive ? "selected" : "")}>Metrics</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default NavBar