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
            text: recipe.text,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Recipe(data.id, data.title, data.image, data.text);
    }
};

class RecipeManager {

    static arrayFromApiResults = async(results) => {
        let recipes = []
        for(let r of results){
            const temp = new Recipe(r['id'], r['title'], r['image']);
            await temp.fillText();
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

    static addNewRecipe = async(title,body,img,cuisine) => {
        let recipe_id = Math.floor(Math.random()*(9999999-1000000)+1000000)
        let new_recipe = new Recipe(recipe_id,title,img,body)

        RecipeManager.saveRecipes([new_recipe],cuisine)
    }

    //https://www.reddit.com/r/Firebase/comments/fpicg8/comment/fll70js/?utm_source=share&utm_medium=web2x&context=3
    static updateRecipes = async(recipes, cuisine) => {
        if (!cuisine || !recipes){
            return;
        }
        const recipeSubcollection = collection(FirebaseAdapter.getDB(), 'recipes', cuisine, 'recipes');
        for (let r of recipes){
            console.log(`Updating recipe ${r.id} in database`);
            const ref = doc(recipeSubcollection, r.id.toString()).withConverter(recipeConverter);
            await setDoc(ref, r);
        }
    }

    static async queryCuisine(cuisine){
        let collectionref = collection(FirebaseAdapter.getDB(), 'recipes', cuisine, 'recipes').withConverter(recipeConverter);

        let recipes;
        let needsUpdate = false;
        await getDocs(collectionref)
        .then(async (querySnapshot) => {
            recipes = querySnapshot.docs.map(doc => doc.data());
            return recipes;
        }).then(async (recipes) => {
            console.log(recipes);
            for(let r of recipes){
                let text = await r.getText();
                if (text == null){
                    needsUpdate = true;
                    console.log(`Found null text for recipe ${r.title}`);
                    await r.fillText();
                }
            }
            return recipes;
        }).then(async (recipes) => {
            if (needsUpdate){
                console.log(`Saving filled text for recipes`);
                this.updateRecipes(recipes, cuisine);
            }
            return recipes;
        })
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