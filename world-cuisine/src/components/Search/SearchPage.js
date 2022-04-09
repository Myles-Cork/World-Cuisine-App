import React from "react";
import "./search.css";
import SearchList from "./SearchList";
import SearchMenu from "./SearchMenu";
// import { queryCuisine } from '../../scripts/spoonacularUtils';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [
        {id: 0, title: "pizza"},
        {id: 1, title: "pasta"},
        {id: 2, title: "soup"},
        {id: 3, title: "sandwich"},
        {id: 4, title: "sandwich"},
        {id: 5, title: "sandwich"},
        {id: 6, title: "sandwich"},
        {id: 7, title: "sandwich"},
        {id: 8, title: "sandwich"},
        {id: 9, title: "sandwich"}
        ],
    }
    this.cuisine = null;
  };

  queryCuisine = (cuisineSelection) => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=94ce307ee3284d85a81ff5401ca4c74c&cuisine=${cuisineSelection}?`)
    .then(response => response.json()) // A second promise
    .then(data => { // Second promise resolved
      console.log(data)
      //this.setState({results: data["results"]})
    })
    .catch(error => console.error(error));
  }

  //https://medium.com/@jasminegump/passing-data-between-a-parent-and-child-in-react-deea2ec8e654
  handleCuisineSelect = (cuisineSelection) => {
    this.setState({cuisine: cuisineSelection})
    this.queryCuisine(cuisineSelection);
  }


  render(){

    return (
        <div>
          <h1>Search for Recipes</h1>
          <SearchMenu onSelect={this.handleCuisineSelect} />
          <SearchList searchresults={this.state.results} openRecipe={this.props.openRecipe}/>
        </div>
      );
  }
}
export default SearchPage;
