import Recipe from "./Recipe";
import { collection, setDoc, getDocs, getDoc, doc } from "firebase/firestore";
import FirebaseAdapter from "../adapters/FirebaseAdapter";
import SpoonacularAdapter from "../adapters/SpoonacularAdapter";

// https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9_1
const recipeConverter = {
    toFirestore: (recipe) => {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Recipe(data.id, data.title, data.image);
    }
};

class RecipeManager {

    static arrayFromApiResults = (results) => {
        let recipes = []
        for(let r of results){
            const temp = new Recipe(r['id'], r['title'], r['image']);
            console.log(temp);
            recipes.push(temp);
        }
        console.log(recipes);
        return recipes;
    }

    //https://www.reddit.com/r/Firebase/comments/fpicg8/comment/fll70js/?utm_source=share&utm_medium=web2x&context=3
    static saveRecipes = async(recipes, cuisine) => {
        if (!cuisine || !recipes){
            return;
        }
        const recipeSubcollection = collection(FirebaseAdapter.getDB(), 'recipes', cuisine, 'recipes');
        console.log(recipeSubcollection);
        for (let r of recipes){
            console.log(`Checking for recipe ${r.id} in database`);
            console.log(r);
            const docRef = doc(FirebaseAdapter.getDB(), 'recipes', cuisine, 'recipes', r.id.toString());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(`Recipe ${r.title} already in database`);
            } else {
                console.log(`Saving recipe ${r.id} in database`);
                const ref = doc(recipeSubcollection, r.id.toString()).withConverter(recipeConverter);
                await setDoc(ref, r);
            }
        }
    }

    static async queryCuisine(cuisine){
        let collectionref = collection(FirebaseAdapter.getDB(), 'recipes', cuisine, 'recipes').withConverter(recipeConverter);

        let recipes;
        await getDocs(collectionref)
        .then(async (querySnapshot) => {
            recipes = querySnapshot.docs.map(doc => doc.data());
        });

        if(recipes.length > 0){
            return recipes;
        } else {
            // Get from Spoonacular
            return SpoonacularAdapter.cuisineSearch(cuisine)
            .then((data) => {
                console.log(data)
                return RecipeManager.arrayFromApiResults(data["results"])
            })
            .then((recipes) => {
                console.log(recipes)
                RecipeManager.saveRecipes(recipes, cuisine)
                return recipes;
            })
        }
    }


}
export default RecipeManager;