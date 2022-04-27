import RecipeDecorator from "./RecipeDecorator";
import { getDoc, setDoc, doc } from "firebase/firestore";

// Decorator pattern: Concrete decorator
class AnnotatedRecipe extends RecipeDecorator {

    note;

    constructor(recipe, note){
        super(recipe);
        this.note = note;
    }

    getNote(){
        return this.note + this.decoratedRecipe.printNote();
    }

    printNote(){
        return "  * " + this.note + this.decoratedRecipe.printNote();
    }

    static noteConverter = {
        toFirestore: (object) => {
            return {
                note: object.note,
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return data.note;
        }
    };

    static decorate = async (recipe, collection) => {
        const ratingDoc = doc(collection, 'note').withConverter(this.noteConverter);
        return await getDoc(ratingDoc)
        .then((snapshot) => {
            if (snapshot.exists()){
                const note = snapshot.data();
                // console.log(note);
                const wrapped = new AnnotatedRecipe(recipe, note);
                // console.log(wrapped);
                return wrapped;
            } else {
                return recipe;
            }
        });
        //return wrapped;
    }

    savePrefs = async (collection) => {
        const ratingDoc = doc(collection, 'note').withConverter(this.noteConverter);
        await setDoc(ratingDoc, {note: this.getNote()});
    }

}
export default AnnotatedRecipe;