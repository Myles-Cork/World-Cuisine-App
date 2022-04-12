import React from "react";
import "./recipeview.css";
import Recipe from "../../model/Recipe";
import RecipeManager from "../../model/RecipeManager";
import RatingManager from "../../model/RatingManager";

class RecipeView extends React.Component {
    

    Rate = (recipe_id,value) => {
      RatingManager.addNewRating(recipe_id,value);
    }

  render(){
    //console.log(this.props);
    const visible = this.props.recipe!==null;

    //console.log(this.props.id);
    // const recipe = RecipeManager.retrieveRecipe(this.props.id);
    // console.log(recipe);




    const view = visible?(
      <div className="recipeViewContainer">
        <div className="recipeView">
          <h1>{this.props.recipe.title}</h1>
          <img src={this.props.recipe.image}/>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur mattis tellus. Curabitur sed faucibus ipsum. Sed ullamcorper dolor nec nisi semper mattis. Duis rutrum fermentum tristique. Duis in sagittis elit, eget pretium tellus. Quisque eget urna lorem. Mauris varius lacus id purus congue tincidunt quis a lorem. Nulla ut tellus vel elit gravida ullamcorper id eget ante. Morbi cursus sapien nec viverra vehicula. Nunc ut erat at ex auctor pellentesque id eget arcu. Quisque a aliquam ligula, ut posuere diam. </p>
          <p>Praesent scelerisque, orci sit amet consectetur dapibus, turpis enim pretium nibh, non porttitor metus tellus quis ante. Nulla ultrices feugiat metus auctor commodo. Aenean ultrices diam vel felis sodales, id blandit eros sollicitudin. Maecenas gravida bibendum erat et venenatis. Fusce aliquam purus nibh, at varius nisi lacinia in. Nam varius at augue non egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu dapibus nisl. Maecenas venenatis nec leo vel tristique. </p>
          <p>Praesent vitae elit mauris. Ut ornare sed velit eget gravida. Pellentesque a vulputate arcu. Nulla tincidunt velit id posuere aliquam. In sit amet dolor ut nisi sagittis suscipit. In ac sagittis velit, et luctus arcu. Fusce ac purus ut libero feugiat dictum. Suspendisse dictum sem vitae porta ullamcorper. </p>
          <p>Nam blandit nunc ligula. Sed turpis leo, congue sit amet diam ac, egestas dapibus urna. Morbi tincidunt rhoncus mattis. Nulla ac nunc fermentum est tristique convallis nec vitae enim. Sed gravida tellus libero, id maximus est placerat sit amet. Fusce purus neque, imperdiet at lacus sed, feugiat finibus est. Aenean feugiat varius tincidunt. In ornare malesuada ipsum, sed finibus tortor molestie rhoncus. Etiam placerat commodo enim vel gravida. Etiam finibus maximus diam et condimentum. Curabitur fringilla dictum elit, quis ultrices est facilisis quis. </p>
          <p>Integer blandit nisl sed scelerisque elementum. Phasellus finibus, tellus vitae faucibus fringilla, turpis lorem suscipit enim, a congue turpis lectus nec nisl. In porttitor aliquam magna. Ut vitae posuere odio. Sed scelerisque hendrerit tellus, quis porttitor augue suscipit laoreet. Curabitur ipsum augue, aliquam vel ultrices vitae, finibus maximus dui. Pellentesque pharetra in erat quis rutrum. Nunc dui arcu, tempus sed turpis vitae, consectetur iaculis velit. Curabitur ut fringilla diam. Aliquam vulputate rutrum dapibus. </p>
          <h2>Current Rating: {RecipeManager.getRating()}</h2>
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
