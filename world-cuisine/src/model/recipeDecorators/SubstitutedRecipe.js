import RecipeDecorator from "./RecipeDecorator";

// Decorator pattern: Concrete decorator
class SubstitutedRecipe extends RecipeDecorator {

    target;
    replacement;

    constructor(target, replacement, recipe){
        super(recipe);
        this.target = target;
        this.replacement = replacement;
    }

    getText(){
        return this.decoratedRecipe.getText().replace(this.target, this.replacement);
    }

}
export default SubstitutedRecipe;