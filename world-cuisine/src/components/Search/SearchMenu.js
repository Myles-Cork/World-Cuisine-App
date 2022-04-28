import React from 'react';
import "./search.css"

class SearchMenu extends React.Component{

  onSelect = (event) => {
    event.preventDefault();
    let cuisineSelection = document.getElementById("cuisineSelect").value;
    // console.log(cuisineSelection);
    this.props.onSelect(cuisineSelection);
  }

  render(){
    const cuisines = [
      "African", "American", "British", "Cajun", "Caribbean", "Chinese", 
      "Eastern European", "European", "French", "German", "Greek", "Indian", 
      "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", 
      "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", 
      "Spanish", "Thai", "Vietnamese"];

    return(
      <form className="searchMenu">
        <label htmlFor="cuisineSelect">Cuisine: </label>
        <select name="cuisineSelect" id="cuisineSelect" defaultValue={cuisines[0]}>
          {cuisines.map(name => <option key={cuisines.indexOf(name)} value={name}>{name}</option>)}
        </select>
        <button type="submit" name="Search" onClick={this.onSelect}>Search</button>
      </form>
    );
  }
}

export default SearchMenu
