import FirebaseAdapter from "../adapters/FirebaseAdapter";
import { collection, setDoc, getDocs, getDoc, doc, collectionGroup, query, where } from "firebase/firestore";
import Recipe from "../model/Recipe";
import RecipeManager from "./RecipeManager";
//import { favoritedConverter } from "../model/recipeDecorators/FavoritedRecipe"

const noteConverter = {
    toFirestore: (note) => {
        return {
            id: note.id,
            text: note.text,
            recipeID: note.decoratedRecipe
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Recipe(data.id, data.title, data.image, data.text);
    }
};

class UserManager {

    static getLoggedInUserId(){
        const auth = FirebaseAdapter.getAuth();
        //console.log(auth);
        const user = auth.currentUser;
        //console.log(user);
        if(user){
            console.log(`Found user ${user.uid}`);
            return user.uid;
        } else {
            console.log("No user logged in");
        }
    }

    static getLoggedInUser(){
        const user = FirebaseAdapter.getAuth().currentUser;
        if(user){
            return user;
        } else {
            console.log("No user logged in");
        }
    }

    static async getFavoriteRecipies(){
        const auth = FirebaseAdapter.getAuth();
        const user = auth.currentUser;
        if(user){
            console.log(`Found user ${user.uid}, loading favorites`);

            const q = query(collection(FirebaseAdapter.getDB(), "users"), where("uid", "==", user.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            let favorites = data.favorites;
            if(favorites == null){
                favorites = [];
            }
            console.log(favorites);
            let allrecipes = [];
            allrecipes = await RecipeManager.getAllRecipes();
            return allrecipes.filter((recipe)=>{
                return favorites.includes((recipe.id));
            });
        } else {
            console.log("No user logged in");
            return([]);
        }
    }

}
export default UserManager;