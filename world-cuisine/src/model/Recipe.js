import { collection, addDoc, getDocs, collectionGroup, query, where } from "firebase/firestore";
import { db } from "../scripts/firebaseUtils";


class Recipe extends Object {
    id;
    title;
    image;

    constructor(id, title, image){
        super();
        this.id = id;
        this.title = title;
        this.image = image;
    }

    static arrayFromApiResults(results){
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
        if (!cuisine){
            return;
        }

        const recipeSubcollection = collection(db, 'recipes', cuisine, 'recipes');
    
        for (let r of recipes){
            await addDoc(recipeSubcollection, {
                id: r.id,
                title: r.title,
                image: r.image,
            });
        }
    }
  
    static searchFirebase(cuisine){

    }

    static retrieveRecipe = async(recipeID) => {
        console.log(recipeID);
        const matches = query(collectionGroup(db, 'recipes'), where('id', '==', recipeID));
        const querySnapshot = await getDocs(matches);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
        });
        return querySnapshot[0];
    }

    setImage(imageLink){
        this.image = imageLink;
    }

    setText(text){
        this.text = text;
    }

}
export default Recipe;