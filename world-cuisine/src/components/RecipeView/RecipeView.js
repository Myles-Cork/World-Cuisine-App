import React from "react";
import "./recipeview.css";
import UserManager from "../../model/UserManager";

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    const visible = this.props.recipe!==null;
    console.log(this.props.recipe);
    //const user_id_render = UserManager.getLoggedInUserId(); // Ideally should come from Dashboard to Homepage to here

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
              onChange={(e) => this.props.rate(this.props.recipe, e.target.value)}
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
 