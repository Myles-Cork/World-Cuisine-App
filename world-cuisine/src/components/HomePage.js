import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import SearchPage from "./Search/SearchPage";
import TopPage from "./TopRecipes/TopPage";
import FavPage from "./Favorites/FavPage";
import CreatePage from "./Create/CreatePage";
import RecipeView from "./RecipeView/RecipeView";
import Dashboard from "./Dashboard";

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipeOpened: null
    };

    this.openRecipe = this.openRecipe.bind(this);
  }
  
  openRecipe = (r) => {
    console.log(`Opening recipe: ${r}`);
    this.setState({
      recipeOpened: r
    });
  }

  render(){

    return (
      <div>
        <RecipeView recipe={this.state.recipeOpened} openRecipe={this.openRecipe}/>
        <div>
          <NavBar/>
          <Routes>
            <Route path="search" element={<SearchPage openRecipe={this.openRecipe}/>} />
            <Route path="top" element={<TopPage />} />
            <Route path="favorites" element={<FavPage openRecipe={this.openRecipe}/>} />
            <Route path="create" element={<CreatePage />} />
          </Routes>
          <Dashboard/>
        </div>
      </div>
    );
  }
}
export default HomePage;


