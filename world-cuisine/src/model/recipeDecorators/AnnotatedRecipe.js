import RecipeDecorator from "./RecipeDecorator";

// Decorator pattern: Concrete decorator
class AnnotatedRecipe extends RecipeDecorator {

    note;

    constructor(note, recipe){
        super(recipe);
        this.note = note;
    }

    getText(){
        return this.note + "\n" + this.decoratedRecipe.getText();
    }

}
export default AnnotatedRecipe;