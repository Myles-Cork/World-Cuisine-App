import FirebaseAdapter from "../adapters/FirebaseAdapter";

class UserManager {

    static getLoggedInUserId(){
        const auth = FirebaseAdapter.getAuth();
        //console.log(auth);
        const user = auth.currentUser;
        //console.log(user);
        if(user){
            //console.log(`Found user ${user.uid}`);
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

}
export default UserManager;