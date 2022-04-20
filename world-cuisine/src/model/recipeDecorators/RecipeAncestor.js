// Decorator pattern: Abstract component
class RecipeAncestor {

    constructor(){
        //super();
    }

    getText(){
        alert("Abstract method not overriden: getText in RecipeAncestor");
    }
}
export default RecipeAncestor;