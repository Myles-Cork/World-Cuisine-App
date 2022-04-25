import React from 'react';
import "./favorites.css"

class FavResult extends React.Component{
  render(){
    return(
      <div className="favResult" onClick={() => {this.props.openRecipe(this.props.recipe)}}>
        <img src={this.props.recipe.image}/>
        <h2>{this.props.recipe.title}</h2>
      </div>
    );
  }
}

export default FavResult
