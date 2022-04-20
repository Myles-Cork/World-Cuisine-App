// Decorator pattern: Abstract component
class RecipeAncestor {

    constructor(){
        //super();
    }

    getText(){
        alert("Abstract method not overridden: getText in RecipeAncestor");
    }

    getRating(){
        alert("Abstract method not overridden: getRating in RecipeAncestor");
    }

    getImage(){
        alert("Abstract method not overridden: getImage in RecipeAncestor");
    }

    getTitle(){
        alert("Abstract method not overridden: getTitle in RecipeAncestor");
    }
}
export default RecipeAncestor;