// import Rating from "./Rating";
import { collection, setDoc, getDocs, doc, } from "firebase/firestore";
import FirebaseAdapter from "../adapters/FirebaseAdapter";
import AnnotatedRecipe from "./recipeDecorators/AnnotatedRecipe";
import RatedRecipe from "./recipeDecorators/RatedRecipe";
import SubstitutedRecipe from "./recipeDecorators/SubstitutedRecipe";

class DecoratorManager {

    // static ratingConverter = {
    //     toFirestore: (rating) => {
    //         return {
    //             id: rating.user_id,
    //             recipe_id: rating.recipe_id,
    //             value: rating.value,
    //         };
    //     },
    //     fromFirestore: (snapshot,options) => {
    //         const data = snapshot.data(options);
    //         return new Rating(data.user_id, data.recipe_id, data.value);
    //     }
    // };

    // static searchFirebase = () => {
    //     const ratingsCollection = collection(FirebaseAdapter.getDB(), 'ratings')
    //     const results = getDocs(ratingsCollection).withConverter(this.ratingConverter);
    //     console.log(results);
    //     return results;
    // }

    static decorate = async (recipe, user_id) => {
        console.log(`Loading customizations for ${recipe.title}`);
        // pull from Firebase
        console.log(user_id);
        console.log(recipe.getID());
        const recipeModsCollection = collection(FirebaseAdapter.getDB(), 'userPrefs', user_id, recipe.getID().toString());
        //console.log(recipeModsCollection);
        let wrappedRecipe = await RatedRecipe.decorate(recipe, recipeModsCollection);
        // wrappedRecipe = AnnotatedRecipe.decorate(recipe, recipeModsCollection);
        // wrappedRecipe = SubstitutedRecipe.decorate(recipe, recipeModsCollection);
        console.log(wrappedRecipe);
        return wrappedRecipe;
    }

    // The asynchronous part
    // static saveRating = async (user_id, recipe_id, value) => {
    //     console.log(`Save rating to dB, ${user_id}, ${recipe_id}, ${value}`);
    //     // creates new collection if needed
    //     const userSettingsCollection = collection(FirebaseAdapter.getDB(), 'userPrefs', user_id, 'customizations');
    //     console.log(userSettingsCollection);

    //     // Doc with key as recipe ID can hold all recipe customizations
    //     await setDoc(doc(userSettingsCollection, recipe_id.toString()), {
    //         id: user_id,
    //         recipe_id: recipe_id,
    //         rating: value
    //     });
    //     return;
    // }

    // The asynchronous part (new version)
    static saveDecoration = async (user_id, wrappedRecipe) => {
        console.log(`Save modification to dB, ${user_id}, ${wrappedRecipe.getTitle()}`);
        
        // userPrefs collection; doc for specific user; collection for recipe ID
        const recipeModsCollection = collection(FirebaseAdapter.getDB(), 'userPrefs', user_id, wrappedRecipe.getID().toString());
        console.log(recipeModsCollection);
        
        // Doc with key as recipe ID can hold all recipe customizations
        wrappedRecipe.savePrefs(recipeModsCollection);

        return;
    }
    

    // The synchronous part
    // static addNewRating = (user_id, recipe, value) => {
    //     this.saveRating(user_id, recipe.id, value);
    //     console.log('added new rating');
    //     const wrappedRecipe = new RatedRecipe(recipe, value);
    //     return wrappedRecipe;
    // }

    static addNewRating = (user_id, recipe, value) => {
        const wrappedRecipe = new RatedRecipe(recipe, value);
        this.saveDecoration(user_id, wrappedRecipe);
        console.log('added new rating');
        return wrappedRecipe;
    }


}
export default DecoratorManager;