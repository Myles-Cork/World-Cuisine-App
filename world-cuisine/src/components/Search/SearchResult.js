import React from 'react';
import "./search.css"

class SearchResult extends React.Component{
  render(){
    // console.log(`Search result props:`);
    // console.log(this.props);
    return(
      <div className="searchResult" onClick={() => {this.props.openRecipe(this.props.recipe)}}>
        <img src={this.props.recipe.image}/>
        <h2>{this.props.recipe.title}</h2>
      </div>
    );
  }
}

export default SearchResult
