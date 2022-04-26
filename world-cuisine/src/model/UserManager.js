import FirebaseAdapter from "../adapters/FirebaseAdapter";
import { collection, setDoc, getDocs, getDoc, doc, collectionGroup, query, where } from "firebase/firestore";
import Recipe from "../model/Recipe";
import RecipeManager from "./RecipeManager";

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

    static async updateUserFavoritesList(userid, recipe, favoritestatus){
        const col = collection(FirebaseAdapter.getDB(), "users");
        const q = query(col, where("uid", "==", user_id));
        
        getDocs(q).then((userdocs)=>{
            const userdocref = userdocs.docs[0].ref;
            let favorites = userdocs.docs[0].data().favorites;
            if(favorites == null){
                favorites = [];
            }
            const rid = recipe.getID();
            const ridind = favorites.indexOf(rid)
            if(favoritestatus && ridind === -1){
                favorites.push(rid);
                setDoc(userdocref, {favorites: favorites}, {merge: true});
            }else if(!favoritestatus && ridind !== -1){
                favorites.splice(ridind,1);
                updateDoc(userdocref, {favorites: favorites}, {merge: true});
            }
        });
    }

}
export default UserManager;