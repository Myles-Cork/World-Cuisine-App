import React from "react";
import "./search.css";
import SearchList from "./SearchList";
import SearchMenu from "./SearchMenu";

class SearchPage extends React.Component {

  render(){
    const results = [
    {number: 0, name: "pizza"},
    {number: 1, name: "pasta"},
    {number: 2, name: "soup"},
    {number: 3, name: "sandwich"},
    {number: 4, name: "sandwich"},
    {number: 5, name: "sandwich"},
    {number: 6, name: "sandwich"},
    {number: 7, name: "sandwich"},
    {number: 8, name: "sandwich"},
    {number: 9, name: "sandwich"}
    ];

    return (
        <div>
          <h1>Search for Recipes</h1>
          <SearchMenu/>
          <SearchList searchresults={results} openRecipe={this.props.openRecipe}/>
        </div>
      );
  }
}
export default SearchPage;
