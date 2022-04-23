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
import DecoratorManager from "../model/DecoratorManager";

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipeOpened: null,
    };

    this.openRecipe = this.openRecipe.bind(this);
  }

  openRecipe = async (r) => {
    const user_id_local = UserManager.getLoggedInUserId();
    if(r != null){
      console.log(`Opening recipe: ${r.title}`);
      await DecoratorManager.decorate(r, user_id_local)
      .then((r) =>{
        this.setState({
          recipeOpened: r
        });
      })
    } else {
      this.setState({
        recipeOpened: r
      });
    }
  }

  rate = (recipe, value) => {
    console.log(`Rating recipe! ${value}`);
    const user_id_local = UserManager.getLoggedInUserId();
    let wrappedRecipe = DecoratorManager.addNewRating(user_id_local, recipe, value);
    this.setState({
      recipeOpened: wrappedRecipe
    })
  }

  note = (recipe, text) => {
    console.log(`Adding note to recipe`);
    const user_id_local = UserManager.getLoggedInUserId();
    let wrappedRecipe = DecoratorManager.addNewNote(user_id_local, recipe, text);
    this.setState({
      recipeOpened: wrappedRecipe
    })
  }

  substitute = (recipe, target, replacement) => {
    console.log('Creating substitution for recipe');
    const user_id_local = UserManager.getLoggedInUserId();
    let wrappedRecipe = DecoratorManager.addNewSubstitution(user_id_local, recipe, target, replacement);
    this.setState({
      recipeOpened: wrappedRecipe
    })
  }

  render(){
    return (
      <div>
        <RecipeView recipe={this.state.recipeOpened} user_id={this.state.user_id} openRecipe={this.openRecipe} rate={this.rate} note={this.note} substitute={this.substitute}/>
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


