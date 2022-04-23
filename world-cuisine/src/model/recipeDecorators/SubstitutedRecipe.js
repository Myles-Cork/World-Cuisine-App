import RecipeDecorator from "./RecipeDecorator";
import { getDoc, setDoc, doc } from "firebase/firestore";

// Decorator pattern: Concrete decorator
class SubstitutedRecipe extends RecipeDecorator {

    target;
    replacement;

    constructor(recipe, target, replacement){
        super(recipe);
        this.target = target;
        this.replacement = replacement;
    }

    getText(){
        return this.decoratedRecipe.getText().replace(this.target, this.replacement);
    }

    static substitutionConverter = {
        toFirestore: (object) => {
            return {
                target: object.target,
                replacement: object.replacement
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return [data.target, data.replacement];
        }
    };

    static decorate = async (recipe, collection) => {
        const ratingDoc = doc(collection, 'replacement').withConverter(this.substitutionConverter);
        return await getDoc(ratingDoc)
        .then((snapshot) => {
            if (snapshot.exists()){
                const [target, replacement] = snapshot.data();
                console.log(target);
                console.log(replacement);
                const wrapped = new SubstitutedRecipe(recipe, target, replacement);
                console.log(wrapped);
                return wrapped;
            } else {
                return recipe;
            }
        });
    }

    savePrefs = async (collection) => {
        const ratingDoc = doc(collection, 'replacement').withConverter(this.substitutionConverter);
        await setDoc(ratingDoc, {
            target: this.target,
            replacement: this.replacement,
        });
    }

}
export default SubstitutedRecipe;