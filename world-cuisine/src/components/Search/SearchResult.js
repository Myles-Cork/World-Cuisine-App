import React from 'react';
import "./search.css"

class SearchResult extends React.Component{
  render(){
    return(
      <div className="searchResult">
        <img src={require("../../images/recipeIcon.png")}/>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default SearchResult
