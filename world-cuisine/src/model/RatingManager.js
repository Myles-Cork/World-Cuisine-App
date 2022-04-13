import Rating from "./Rating";
import { collection, addDoc, setDoc, getDocs, getDoc, doc, collectionGroup, query, where, orderBy, limit} from "firebase/firestore";
import FirebaseAdapter from "../adapters/FirebaseAdapter";

class RatingManager {

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
            return new Rating(data.user_id, data.recipe_id, data.value);
        }
    };

    static searchFirebase = () => {
        const ratingsCollection = collection(FirebaseAdapter.getDB(), 'ratings')
        const results = getDocs(ratingsCollection).withConverter(this.ratingConverter);
        console.log(results);
        return results;
    }
    
    static getRating = async(user_id,recipe_id) => {

        const col = collection(FirebaseAdapter.getDB(), 'ratings');
        const q = query(col, where('id', '==', user_id));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            if (doc.data().recipe_id == recipe_id){
                return doc.data().value;
            }
        });

        return null;
    }

    static addNewRating = async(user_id, recipe_id, value) => {
        await setDoc(doc(FirebaseAdapter.getDB(), 'ratings', user_id), {
            id: user_id,
            recipe_id: recipe_id,
            value: value
        });
        console.log('added new rating');
        return;
    }

}
export default RatingManager;