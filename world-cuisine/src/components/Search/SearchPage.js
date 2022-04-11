import React from "react";
import "./search.css";
import SearchList from "./SearchList";
import SearchMenu from "./SearchMenu";
import Recipe from "../../model/Recipe";
import {saveRecipes} from "../../scripts/firebaseUtils";
// import { queryCuisine } from '../../scripts/spoonacularUtils';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
    this.cuisine = null;
  };

  queryCuisine = (cuisineSelection) => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=94ce307ee3284d85a81ff5401ca4c74c&cuisine=${cuisineSelection}?`)
    .then(response => response.json()) // A second promise
    .then(data => { // Second promise resolved
      console.log(data)
      let recipes = Recipe.arrayFromApiResults(data["results"]);
      // TODO: check if there is anyting to save
      saveRecipes(recipes, this.state.cuisine);
      this.setState({results: recipes})
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
