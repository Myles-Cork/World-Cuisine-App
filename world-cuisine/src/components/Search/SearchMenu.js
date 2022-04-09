import React from 'react';
import "./search.css"

class SearchMenu extends React.Component{

  render(){
    const cuisines = [
      "food",
      "other"
    ];

    return(
      <form className="searchMenu">
        <label htmlFor="cuisineSelect">Cuisine: </label>
        <select name="cuisineSelect" defaultValue={cuisines[0]}>
          {cuisines.map(name => <option key={cuisines.indexOf(name)} value={name}>{name}</option>)}
        </select>
        <button type="submit" name="Search">Search</button>
      </form>
    );
  }
}

export default SearchMenu
