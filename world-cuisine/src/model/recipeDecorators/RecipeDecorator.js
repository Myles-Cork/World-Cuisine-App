import RecipeAncestor from "./RecipeAncestor";

// Decorator pattern: Abstract Decorator
class RecipeDecorator extends RecipeAncestor {
    decoratedRecipe;

    constructor(recipe){
        super();
        this.decoratedRecipe = recipe;
    }

    getID(){
        return this.decoratedRecipe.getID();
    }

    getText(){
        return this.decoratedRecipe.getText();
    }

    getRating(){
        return this.decoratedRecipe.getRating();
    }

    getImage(){
        return this.decoratedRecipe.getImage();
    }

    getTitle(){
        return this.decoratedRecipe.getTitle();
    }

    getNote(){
        return this.decoratedRecipe.getNote();
    }

    printNote(){
        return this.decoratedRecipe.printNote();
    }

}
export default RecipeDecorator;