import React from 'react';
import "./favorites.css"

class FavResult extends React.Component{
  render(){
    return(
      <div className="favResult">
        <img src={require("../../images/recipeIcon.png")}/>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default FavResult
