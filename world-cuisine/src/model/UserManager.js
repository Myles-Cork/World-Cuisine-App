import {auth} from "../adapters/firebaseUtils";

class UserManager {

    static getLoggedInUserId(){
        const user = auth.currentUser;
        //console.log(auth);
        if(user){
            //console.log(`Found user ${user.uid}`);
            return user.uid;
        } else {
            console.log("No user logged in");
        }
    }

    static getLoggedInUser(){
        const user = auth.currentUser;
        if(user){
            return auth.currentUser;
        } else {
            console.log("No user logged in");
        }
    }

}
export default UserManager;