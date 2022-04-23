// Decorator pattern: Abstract component
class RecipeAncestor {

    constructor(){
        //super();
    }

    getID(){
        alert("Abstract method not overridden: getID in RecipeAncestor");
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

    savePrefs(){
        alert("Abstract method not overridden: savePrefs in RecipeAncestor");
    }

    getNote(){
        alert("Abstract method not overridden: getNote in RecipeAncestor");
    }

    printNote(){
        return this.getNote();
    }
}
export default RecipeAncestor;