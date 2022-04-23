import SpoonacularAdapter from "../adapters/SpoonacularAdapter";
import RecipeAncestor from "./recipeDecorators/RecipeAncestor";

class Recipe extends RecipeAncestor {
    id;
    title;
    image;
    text;

    constructor(id, title, image, text){
        super();
        this.id = id;
        this.title = title;
        this.image = image;
        this.text = text;
    }

    async fillText(){
        const recipeData = await SpoonacularAdapter.recipeInformation(this.id)
        this.text = recipeData["instructions"]
        //console.log(this.text)
        return this;
    }

    getID(){
        return this.id;
    }

    getText(){
        return this.text;
    }

    getRating(user_id){
        return "";
    }

    getImage(){
        return this.image;
    }

    getTitle(){
        return this.title;
    }

    savePrefs(){
        return;
    }

}
export default Recipe;