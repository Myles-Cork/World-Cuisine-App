import Recipe from "./Recipe";
import { collection, addDoc, setDoc, getDocs, getDoc, doc, collectionGroup, query, where, withConverter } from "firebase/firestore";
import { db } from "../scripts/firebaseUtils";
import SpoonacularAdapter from "../scripts/SpoonacularAdapter";

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
        console.log("Converting from firestore!");
        console.log(data);
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
        const recipeSubcollection = collection(db, 'recipes', cuisine, 'recipes');
        console.log(recipeSubcollection);
        for (let r of recipes){
            console.log(`Checking for recipe ${r.id} in database`);
            console.log(r);
            const docRef = doc(db, 'recipes', cuisine, 'recipes', r.id.toString());
            //console.log(docRef);
            const docSnap = await getDoc(docRef);
            //console.log(docSnap);

            if (docSnap.exists()) {
                console.log(`Recipe ${r.title} already in database`);
            } else {
                console.log(`Saving recipe ${r.id} in database`);
                const ref = doc(recipeSubcollection, r.id.toString()).withConverter(recipeConverter);
                await setDoc(ref, r);
            }
        }
    }
  
    // static searchFirebase(cuisine){
    //     const recipeSubcollection = collection(db, 'recipes', cuisine, 'recipes');
    //     const results = getDocs(recipeSubcollection).withConverter(this.recipeConverter);
    //     return results;
    // }

    // static fillAsyncArray = async (items) => {
    //     console.log("Attempting async array");
    //     const recipes = [];
    //     items.forEach(async (doc) =>{
    //         let recipe = (await doc.get()).data();
    //         console.log(recipe);
    //         recipes.push(recipe);
    //     })
    //     console.log(recipes);
    //     return recipes;
    // }

    static async queryCuisine(cuisine){
        // Check if in Firebase
        //let recipes = [];
        const recipeSubcollection = collection(db, 'recipes', cuisine, 'recipes').withConverter(recipeConverter);

        let recipes = getDocs(recipeSubcollection)
        .then( (querySnapshot) => {
            recipes = querySnapshot.docs.map(doc => doc.get().data());
            console.log(recipes);
        })
        

        //const q = query(recipeSubcollection, where("id", "==", 632003));
        //const recipesFromDBSnapshot = await getDocs(recipeSubcollection);
        // console.log(recipesFromDBSnapshot);
        // recipesFromDBSnapshot.forEach(async (doc) => {
        //     // console.log(doc.id, " => ", doc.data());
        //     let recipe = (await doc.get()).data();
        //     console.log(recipe);
        //     recipes.push(recipe);
        //     // const recipe = (await )
        //     // console.log(await (doc.get()).data());
        //     // recipes.push(doc.withConverter(recipeConverter));
        //     // console.log(recipes);
        // }).then({
        // console.log(recipes);
        // return recipes;
        //return this.fillAsyncArray(recipesFromDBSnapshot);
    }

        // if(recipesFromDB.length > 0){
        //     return recipesFromDB;
        // } else {
        //     // Get from Spoonacular
        //     const data = SpoonacularAdapter.cuisineSearch(cuisine);
        //     let recipes = RecipeManager.arrayFromApiResults(data["results"]);

        //     // Save to Firebase
        //     console.log(`Saving ${cuisine} recipes:`);
        //     console.log(recipes);
        //     RecipeManager.saveRecipes(recipes, cuisine);
        //     return recipes;
        // }
    // }
}
export default RecipeManager;