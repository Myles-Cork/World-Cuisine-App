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
      recipeIdOpened: null
    };

    this.openRecipe = this.openRecipe.bind(this);
  }
  
  openRecipe(id){
    console.log(`Opening recipe: ${id}`);
    this.setState({
      recipeIdOpened: id
    });
  }

  render(){

    return (
      <div>
        <RecipeView id={this.state.recipeIdOpened} openRecipe={this.openRecipe}/>
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


