// Decorator pattern: Abstract component
class RecipeAncestor extends Object {

    constructor(){
        super();
    }

    getText(){
        alert("Abstract method not overriden: getText in RecipeAncestor");
    }
}