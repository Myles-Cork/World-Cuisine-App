import React from "react";
import "./recipeview.css";

class RecipeView extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    const visible = this.props.recipe!==null;
    // console.log(this.props.recipe);

    const view = visible?(
      <div className="recipeViewContainer">
        <div className="recipeView">
          <h1>
            {this.props.recipe.getTitle()} 
            <div className="star">
              <input type={"checkbox"}
                id="favoritestar"
                defaultChecked={this.props.recipe.getFavorited()}
                onChange={(e) => this.props.favorite(this.props.recipe, e.target.checked)}
              />
              <label htmlFor="favoritestar"/>
            </div>
          </h1>
          
          <img src={this.props.recipe.getImage()}/>
          <p>{this.props.recipe.getText()}</p>
          <h3>Notes:</h3>
          <p>{this.props.recipe.printNote()}</p>
          <h3>Current Rating: {this.props.recipe.getRating()}</h3>
          <form className="recipe_actions">
            <div>
              <label>Rating: </label>
              <input
              type="text"
              className="rating_textbox"
              value={this.props.recipe.getRating()}
              onChange={(e) => this.props.rate(this.props.recipe, e.target.value)}
              placeholder="Your rating (X/5)"
            /></div>
            <div>
              <label>Notes: </label>
              <input
              type="text"
              id="notes_textbox"
              className="notes_textbox"
              placeholder=""
            />
            <button onClick={(e) => {e.preventDefault(); this.props.note(this.props.recipe, document.getElementById("notes_textbox").value)}}>Add Note</button>
            </div>
            <div><input
              type="text"
              id = "target_textbox"
              className="target_textbox"
              content={""}
              placeholder="Replace this:"
            />
            <input
              type="text"
              id = "replacement_textbox"
              className="replacement"
              content={""}
              placeholder="with this:"
            /></div>
          </form>
          <button onClick={(e) => {e.preventDefault(); this.props.substitute(this.props.recipe, document.getElementById("target_textbox").value, document.getElementById("replacement_textbox").value)}}>Substitute</button>
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
 