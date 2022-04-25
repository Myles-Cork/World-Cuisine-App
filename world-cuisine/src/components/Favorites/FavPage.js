import React from "react";
import "./favorites.css";
import FavList from "./FavList";
import UserManager from "../../model/UserManager";

class FavPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      favorites: []
    }
  }

  componentDidMount(){
    UserManager.getFavoriteRecipies().then((favs) => {
      if (favs !== undefined || favs !== null){
        this.setState({
          favorites: favs
        });
      }
    })    
  }

  render(){

    return (
        <div>
          <h1>Your Favorite Recipes</h1>
          <FavList favresults={this.state.favorites} openRecipe={this.props.openRecipe}/>
        </div>
      );
  }
}
export default FavPage;
