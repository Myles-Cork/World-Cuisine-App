import Recipe from "./Recipe";
import Rating from "./Rating";
import { collection, addDoc, setDoc, getDocs, getDoc, doc, collectionGroup, query, where, orderBy, limit} from "firebase/firestore";
import { db, auth } from "../scripts/firebaseUtils";

class RatingManager {

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
            return new Rating(data.user_id,data.recipe_id,data.value);
        }
    };

    static searchFirebase(user_id,recipe_id){
        const ratingsCollection = collection(db,'ratings')
        const results = getDocs(ratingsCollection).withConverter(this.ratingConverter);
        console.log(results);
        return results;
    }
    /*
    static getFavorites(user_id){
        const q = query(collection(db,'ratings'), where('id','==',user_id), orderBy('value'),limit(10));
        favorites = [];

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            d = doc.data();
            favorites.push(new Rating(d.recipe_id));
        })

        return favorites;
    }
    */
    
    static getRating = async(user_id,recipe_id) => {

        const col = collection(db,'ratings');
        const q = query(col, where('id','==',user_id));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            if (doc.data().recipe_id == recipe_id){
                return doc.data().value;
            }
        });

        return null;
    }

    static addNewRating = async(user_id,recipe_id,value) => {
        await setDoc(doc(db,'ratings',user_id), {
            id:user_id,
            recipe_id:recipe_id,
            value:value
        });
        console.log('added new rating');
        return;
    }
    /*
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
                const ref = doc(recipeSubcollection, r.id.toString()).withConverter(RecipeManager.recipeConverter);
                await setDoc(ref, r);
            }
        }
    }
    */

}
export default RatingManager;