// Decorator pattern: Concrete decorator
class AnnotatedRecipe extends Recipe {

    note;

    constructor(note, recipe){
        super(recipe);
        this.note = note;
    }

    getText(){
        return note + "\n" + decoratedRecipe.getText();
    }

}