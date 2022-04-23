import RecipeDecorator from "./RecipeDecorator";
import { getDoc, setDoc, doc } from "firebase/firestore";

// Decorator pattern: Concrete decorator
class RatedRecipe extends RecipeDecorator {
    rating;

    constructor(recipe, rating){
        super(recipe);
        this.rating = rating;
    }

    getRating(){
        if(this.rating)
            return this.rating;
    }

    static ratingConverter = {
        toFirestore: (object) => {
            return {
                value: object.rating,
            };
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return data.rating;
        }
    };

    static decorate = async (recipe, collection) => {
        const ratingDoc = doc(collection, 'rating').withConverter(this.ratingConverter);
        return await getDoc(ratingDoc)
        .then((snapshot) => {
            if (snapshot.exists()){
                const rating = snapshot.data();
                console.log(rating);
                const wrapped = new RatedRecipe(recipe, rating);
                console.log(wrapped);
                return wrapped;
            } else {
                return recipe;
            }
        });
        //return wrapped;
    }

    savePrefs = async (collection) => {
        const ratingDoc = doc(collection, 'rating').withConverter(this.ratingConverter);
        await setDoc(ratingDoc, {rating: this.rating});
    }

}
export default RatedRecipe;