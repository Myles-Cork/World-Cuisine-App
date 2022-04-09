import React from 'react';
import SearchResult from './SearchResult.js';
import "./search.css"

class SearchList extends React.Component{
  render(){
    return(
      <div className="searchList">
          {this.props.searchresults.map(result => <SearchResult key={result.id} name={result.title} openRecipe={this.props.openRecipe}/>)}
      </div>
    );
  }
}

export default SearchList
