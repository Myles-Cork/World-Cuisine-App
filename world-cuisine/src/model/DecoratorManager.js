// import Rating from "./Rating";
import { collection } from "firebase/firestore";
import FirebaseAdapter from "../adapters/FirebaseAdapter";
import AnnotatedRecipe from "./recipeDecorators/AnnotatedRecipe";
import FavoritedRecipe from "./recipeDecorators/FavoritedRecipe";
import RatedRecipe from "./recipeDecorators/RatedRecipe";
import SubstitutedRecipe from "./recipeDecorators/SubstitutedRecipe";
import UserManager from "./UserManager";
class DecoratorManager {

    static decorate = async (recipe, user_id) => {
        console.log(`Loading customizations for ${recipe.title}`);
        // pull from Firebase
        console.log(user_id);
        console.log(recipe.getID());
        const recipeModsCollection = collection(FirebaseAdapter.getDB(), 'userPrefs', user_id, recipe.getID().toString());
        //console.log(recipeModsCollection);
        return await RatedRecipe.decorate(recipe, recipeModsCollection)
        .then((wrapped) => {
            return AnnotatedRecipe.decorate(wrapped, recipeModsCollection);
        }).then((wrapped) => {
            return SubstitutedRecipe.decorate(wrapped, recipeModsCollection);
        }).then((wrapped) => {
            return FavoritedRecipe.decorate(wrapped, recipeModsCollection);
        });
    }

    // The asynchronous part (new version)
    static saveDecoration = async (user_id, wrappedRecipe) => {
        console.log(`Save modification to dB, ${user_id}, ${wrappedRecipe.getTitle()}`);
        
        // userPrefs collection; doc for specific user; collection for recipe ID
        const recipeModsCollection = collection(FirebaseAdapter.getDB(), 'userPrefs', user_id, wrappedRecipe.getID().toString());
        //console.log(recipeModsCollection);
        
        // Doc with key as recipe ID can hold all recipe customizations
        wrappedRecipe.savePrefs(recipeModsCollection);
        return;
    }
    
    static addNewRating = (user_id, recipe, value) => {
        const wrappedRecipe = new RatedRecipe(recipe, value);
        this.saveDecoration(user_id, wrappedRecipe);
        console.log('added new rating');
        return wrappedRecipe;
    }

    static addNewNote = (user_id, recipe, text) => {
        console.log(text);
        const wrappedRecipe = new AnnotatedRecipe(recipe, text);
        this.saveDecoration(user_id, wrappedRecipe);
        console.log('added new note');
        return wrappedRecipe;
    }

    static addNewSubstitution = (user_id, recipe, target, replacement) => {
        //console.log(text);
        const wrappedRecipe = new SubstitutedRecipe(recipe, target, replacement);
        this.saveDecoration(user_id, wrappedRecipe);
        console.log('added new note');
        return wrappedRecipe;
    }

    static addNewFavorite = (user_id, recipe, favoritestatus) => {
        const wrappedRecipe = new FavoritedRecipe(recipe, favoritestatus);
        this.saveDecoration(user_id, wrappedRecipe);
        console.log('added new favorite status');
        return wrappedRecipe;
    }

}
export default DecoratorManager;