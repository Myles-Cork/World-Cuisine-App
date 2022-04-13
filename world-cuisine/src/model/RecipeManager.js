import Recipe from "./Recipe";
import { collection, addDoc, setDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../adapters/firebaseUtils";
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

    static arrayToFirebase = (recipes,cuisine) => {
        console.log('arrayToFirebase');
        for (let r of recipes){
            console.log(r);
            const ref = doc(db,'recipes',cuisine, 'recipes', r.id.toString()).withConverter(recipeConverter);
            setDoc(ref,r);
        }
        console.log('fin');
    }

    static async queryCuisine(cuisine){
        let collectionref = collection(db, 'recipes', cuisine, 'recipes').withConverter(recipeConverter);

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
                return RecipeManager.arrayFromApiResults(data["results"],cuisine)
            })
            .then((recipes) => {
                console.log(recipes)
                RecipeManager.arrayToFirebase(recipes, cuisine);
                return recipes;
            })
        }
    }


}
export default RecipeManager;