import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import SearchPage from "./Search/SearchPage";
import TopPage from "./TopRecipes/TopPage";
import FavPage from "./Favorites/FavPage";
import CreatePage from "./Create/CreatePage";
import RecipeView from "./RecipeView/RecipeView";
import Dashboard from "./Dashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../adapters/firebaseUtils";

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipeOpened: null,
      // user: auth.currentUser
    };

    this.openRecipe = this.openRecipe.bind(this);
  }
  
  openRecipe = (r) => {
    console.log(`Opening recipe: ${r}`);
    this.setState({
      recipeOpened: r
    });
  }

  // componentDidMount() {
  //   const [user, loading, error] = useAuthState(auth);
  //   this.setState({
  //     userID: user
  //   });
  // }

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


