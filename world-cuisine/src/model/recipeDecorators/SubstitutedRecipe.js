// Decorator pattern: Concrete decorator
class SubstitutedRecipe extends Recipe {

    target;
    replacement;

    constructor(target, replacement, recipe){
        super(recipe);
        this.target = target;
        this.replacement = replacement;
    }

    getText(){
        return decoratedRecipe.getText().replace(target, replacement);
    }

}