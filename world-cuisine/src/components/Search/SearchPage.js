import React from "react";
import "./search.css";
import SearchList from "./SearchList";
import SearchMenu from "./SearchMenu";
import RecipeManager from "../../model/RecipeManager";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
    this.cuisine = null;
  };

  //https://medium.com/@jasminegump/passing-data-between-a-parent-and-child-in-react-deea2ec8e654
  handleCuisineSelect = async (cuisineSelection) => {
    this.setState({cuisine: cuisineSelection})
    const recipes = await RecipeManager.queryCuisine(cuisineSelection);
    // console.log("Search Page received recipes:");
    // console.log(recipes);
    this.setState({results: recipes});
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
