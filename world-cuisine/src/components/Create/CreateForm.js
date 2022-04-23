import React from 'react';
import "./create.css"
import RecipeManager from "../../model/RecipeManager";

class CreateForm extends React.Component{
  
  onSelect = (event) => {
    event.preventDefault();
    
    let cuisineSelection = document.getElementById("cuisineSelect").value;
    let recipe_title = document.getElementById("recipe_title").value;
    let recipe_body = document.getElementById("recipe_body").value;
    let recipe_img = document.getElementById("recipe_image").value;

    console.log(cuisineSelection,' ',recipe_title,' ',recipe_body,' ',recipe_img)

    document.getElementById("create_recipe_form").reset()

    RecipeManager.addNewRecipe(recipe_title,recipe_body,recipe_img,cuisineSelection);
  }

  render(){
    const cuisines = [
      "African", "American", "British", "Cajun", "Caribbean", "Chinese", 
      "Eastern European", "European", "French", "German", "Greek", "Indian", 
      "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", 
      "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", 
      "Spanish", "Thai", "Vietnamese"];

    return(
      <form className="createForm" id="create_recipe_form">
        <ul>
          <li>
            <label>Cuisine: </label>
            <select name="cuisineSelect" id="cuisineSelect" defaultValue={cuisines[0]}>
              {cuisines.map(name => <option key={cuisines.indexOf(name)} value={name}>{name}</option>)}
            </select>
          </li>
          <li>
            <label>Title: </label>
            <input type="text" name="Name" id="recipe_title"/>
          </li>
          <li>
            <label>Body: </label>
            <textarea name="Body" id="recipe_body"/>
          </li>
          <li>
            <label>Link to Image: </label>
            <input type="url" name="image" id="recipe_image"/> 
          </li>
        </ul>
        <button type="submit" name="Create" onClick={this.onSelect}>Create</button>
      </form>
    );
  }
}

export default CreateForm
