import RecipeDecorator from "./RecipeDecorator";

// Decorator pattern: Concrete decorator
class RatedRecipe extends RecipeDecorator {
    rating;

    constructor(recipe, rating){
        super(recipe);
        this.rating = rating;
    }

    getRating(user_id){
        if(this.rating)
            return this.rating;
    }

}
export default RatedRecipe;