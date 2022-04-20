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
        // if (text == null)
        //     this.text = this.getText();
        // else
        this.text = text;
    }

    async fillText(){
        const recipeData = await SpoonacularAdapter.recipeInformation(this.id)
        this.text = recipeData["instructions"]
        console.log(this.text)
        return this;
    }

    getText(){
        // if (this.text == null){
        //     await this.fillText();
        // }
        return this.text;
    }


}
export default Recipe;