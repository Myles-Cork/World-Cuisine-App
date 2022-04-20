import Rating from "./Rating";
import { collection, setDoc, getDocs, doc, } from "firebase/firestore";
import FirebaseAdapter from "../adapters/FirebaseAdapter";
import RatedRecipe from "./recipeDecorators/RatedRecipe";

class RatingManager {

    static ratingConverter = {
        toFirestore: (rating) => {
            return {
                id: rating.user_id,
                recipe_id: rating.recipe_id,
                value: rating.value,
            };
        },
        fromFirestore: (snapshot,options) => {
            const data = snapshot.data(options);
            return new Rating(data.user_id, data.recipe_id, data.value);
        }
    };

    static searchFirebase = () => {
        const ratingsCollection = collection(FirebaseAdapter.getDB(), 'ratings')
        const results = getDocs(ratingsCollection).withConverter(this.ratingConverter);
        console.log(results);
        return results;
    }
    
    // static getRating = async(user_id, recipe) => {

    //     const col = collection(FirebaseAdapter.getDB(), 'ratings');
    //     const q = query(col, where('id', '==', user_id));

    //     const querySnapshot = await getDocs(q);

    //     querySnapshot.forEach((doc) => {
    //         if (doc.data().recipe_id == recipe.id){
    //             return doc.data().value;
    //         }
    //     });

    //     return null;
    // }

    // The asynchronous part
    static saveRating = async (user_id, recipe_id, value) => {
        console.log(`Save rating to dB, ${user_id}, ${recipe_id}, ${value}`);
        // creates new collection if needed
        const userSettingsCollection = collection(FirebaseAdapter.getDB(), 'userPrefs', user_id, 'customizations');
        console.log(userSettingsCollection);
        // Doc with key as recipe ID can hold all recipe customizations
        await setDoc(doc(userSettingsCollection, recipe_id.toString()), {
            id: user_id,
            recipe_id: recipe_id,
            rating: value
        });
        return;
    }

    // The synchronous part
    static addNewRating = (user_id, recipe, value) => {
        this.saveRating(user_id, recipe.id, value);
        console.log('added new rating');
        const wrappedRecipe = new RatedRecipe(recipe, value);
        return wrappedRecipe;
    }

}
export default RatingManager;