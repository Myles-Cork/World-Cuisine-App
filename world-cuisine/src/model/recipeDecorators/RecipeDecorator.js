// Decorator pattern: Abstract Decorator
class RecipeDecorator extends RecipeAncestor {
    decoratedRecipe;

    constructor(recipe){
        super();
        this.decoratedRecipe = recipe;
    }

    getText(){
        alert("Abstract method not overriden: getText in RecipeDecorator");
    }

}