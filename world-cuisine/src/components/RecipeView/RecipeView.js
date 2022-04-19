import React from "react";
import "./recipeview.css";
import RatingManager from "../../model/RatingManager";
import UserManager from "../../model/UserManager";

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      current_rating: null,
    }
  };

  Rate = (recipe_id,value) => {
    RatingManager.addNewRating(this.state.user_id, recipe_id,value);
  }

  componentDidUpdate(){
    const user_id = UserManager.getLoggedInUserId();

    if(this.props.recipe){
      RatingManager.getRating(user_id,this.props.recipe.id)
      .then((rating) => {
        this.setState({
          user_id: user_id,
          current_rating: rating
        });
      });
    }
  }

  render(){

    const visible = this.props.recipe!==null;

    const view = visible?(
      <div className="recipeViewContainer">
        <div className="recipeView">
          <h1>{this.props.recipe.title}</h1>
          <img src={this.props.recipe.image}/>
          <p>{this.props.recipe.text}</p>
          <h2>Current Rating: {this.state.current_rating}</h2>
          <button onClick={() => {this.Rate(this.props.recipe.id,3)}}>Rate</button>
          <button onClick={() => {this.props.openRecipe(null)}}>Exit</button>
        </div>
        <div className="outsideView" onClick={(e) => {this.props.openRecipe(null)}}/>
      </div>
    ) : null;

    return (
      view
    );
  }
}
export default RecipeView;
