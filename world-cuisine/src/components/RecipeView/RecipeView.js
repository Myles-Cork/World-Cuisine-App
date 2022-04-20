import React from "react";
import "./recipeview.css";
import UserManager from "../../model/UserManager";

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
    // if(this.props.recipe != null){
    //   this.state = {
    //     recipeText: this.props.recipe.getText(),
    //     recipeRating: this.props.recipe.getRating(),
    //   };
    // } else {
      // this.state = {
      //   recipeText: null,
      //   recipeRating: "",
      // }
    // }
    // this.state.user_id = UserManager.getLoggedInUserId();
  };

  render(){
    const visible = this.props.recipe!==null;
    const user_id_render = UserManager.getLoggedInUserId();

    const view = visible?(
      <div className="recipeViewContainer">
        <div className="recipeView">
          <h1>{this.props.recipe.getTitle()}</h1>
          <img src={this.props.recipe.getImage()}/>
          <p>{this.props.recipe.getText()}</p>
          <h2>Current Rating: {this.props.recipe.getRating()}</h2>
          <form className="recipe_actions">
            <input
              type="text"
              className="rating_textbox"
              value={this.props.recipe.getRating()}
              onChange={(e) => this.props.rate(user_id_render, this.props.recipe, e.target.value)}
              placeholder="Your rating (X/5)"
            />
          </form>
          {/* <button onClick={() => {this.props.rate(this.props.recipe.id, 3)}}>Rate</button> */}
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
