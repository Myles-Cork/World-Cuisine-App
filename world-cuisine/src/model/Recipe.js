import SpoonacularAdapter from "../adapters/SpoonacularAdapter";

class Recipe extends Object {
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

    async getText(){
        if (this.text == null){
            await this.fillText();
        }
        return this.text;
    }


}
export default Recipe;