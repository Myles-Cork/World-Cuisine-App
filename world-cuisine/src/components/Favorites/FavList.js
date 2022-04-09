import React from 'react';
import FavResult from './FavResult.js';
import "./favorites.css"

class FavList extends React.Component{
  render(){
    return(
      <div className="favList">
          {this.props.favresults.map(result => <FavResult key={result.number} name={result.name} openRecipe={this.props.openRecipe}/>)}
      </div>
    );
  }
}

export default FavList
