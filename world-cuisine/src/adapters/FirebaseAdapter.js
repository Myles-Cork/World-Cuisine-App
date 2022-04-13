//Based on: https://blog.logrocket.com/user-authentication-firebase-react-apps/

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "world-cuisine-e1736.firebaseapp.com",
  projectId: "world-cuisine-e1736",
  storageBucket: "world-cuisine-e1736.appspot.com",
  messagingSenderId: "109056087149",
  appId: "1:109056087149:web:8b71f8c1eb11c0651ddb64",
  measurementId: "G-27PLNDM9FR"
};

const FirebaseAdapter = (function() {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return {
    logInWithEmailAndPassword: async function (email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
        alert("Login failed");
      }
    },

    registerWithEmailAndPassword: async function (name, email, password) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
        });
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    },

    sendPasswordReset: async function (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    },

    logout: function() {
      signOut(auth);
    },

    getAuth: function(){
      //console.log(auth);
      return auth;
    },

    getDB: function(){
      return db;
    }
  };
})();

export default FirebaseAdapter;