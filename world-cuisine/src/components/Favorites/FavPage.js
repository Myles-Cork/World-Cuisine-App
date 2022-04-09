import React from "react";
import "./favorites.css";
import FavList from "./FavList";

class FavPage extends React.Component {

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
          <h1>Your Favorite Recipes</h1>
          <FavList favresults={results} openRecipe={this.props.openRecipe}/>
        </div>
      );
  }
}
export default FavPage;
