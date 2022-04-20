import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import SearchPage from "./Search/SearchPage";
import TopPage from "./TopRecipes/TopPage";
import FavPage from "./Favorites/FavPage";
import CreatePage from "./Create/CreatePage";
import RecipeView from "./RecipeView/RecipeView";
import Dashboard from "./Dashboard";
import UserManager from "../model/UserManager";
import RatingManager from "../model/RatingManager";

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipeOpened: null,
      user_id: UserManager.getLoggedInUserId(),
    };

    this.openRecipe = this.openRecipe.bind(this);
  }
  
  openRecipe = (r) => {
    
    if(r != null){
      console.log(`Opening recipe: ${r.title}`);
      RatingManager.getRating(this.state.user_id, r.id)
      .then((rating) => {

      });
    }
    this.setState({
      recipeOpened: r
    });
  }

  render(){
    return (
      <div>
        <RecipeView recipe={this.state.recipeOpened} user_id={this.state.user_id} openRecipe={this.openRecipe}/>
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


