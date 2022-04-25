import RecipeDecorator from "./RecipeDecorator";
import { getDoc, setDoc, doc } from "firebase/firestore";

// Decorator pattern: Concrete decorator
class FavoritedRecipe extends RecipeDecorator {
    favorited;

    constructor(recipe, favorited){
        super(recipe);
        this.favorited = favorited;
    }

    getFavorited(){
        if(this.favorited)
            return this.favorited;
    }

    static favoritedConverter = {
        toFirestore: (object) => {
            return {
                value: object.favorited,
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return data.favorited;
        }
    };

    static decorate = async (recipe, collection) => {
        const favoritedDoc = doc(collection, 'favorited').withConverter(this.favoritedConverter);
        return await getDoc(favoritedDoc)
        .then((snapshot) => {
            if (snapshot.exists()){
                const favorited = snapshot.data();
                console.log(favorited);
                const wrapped = new FavoritedRecipe(recipe, favorited);
                console.log(wrapped);
                return wrapped;
            } else {
                return recipe;
            }
        });
    }

    savePrefs = async (collection) => {
        const favoritedDoc = doc(collection, 'favorited').withConverter(this.favoritedConverter);
        await setDoc(favoritedDoc, {favorited: this.favorited});
    }

}
export default FavoritedRecipe;