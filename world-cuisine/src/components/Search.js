// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import "./Search.css";
// import { auth, db, logout } from "../scripts/firebaseUtils";
// import { queryCuisine } from "../scripts/spoonacularUtils";
// import { query, collection, getDocs, where } from "firebase/firestore";

// function Search() {
//     const [user, loading, error] = useAuthState(auth);
//     const [name, setName] = useState("");
//     const [keyword, setKeyword] = useState("");
//     const navigate = useNavigate();
//     useEffect(() => {
//         const fetchUserName = async () => {
//           try {
//             const q = query(collection(db, "users"), where("uid", "==", user?.uid));
//             const doc = await getDocs(q);
//             const data = doc.docs[0].data();
//             setName(data.name);
//           } catch (err) {
//             console.error(err);
//             alert("An error occured while fetching user data");
//           }
//         };
//         if (loading) return;
//         if (!user) return navigate("/");
//         fetchUserName();
//       }, [user, loading]);
//       return (
//         <div className="search">
//            <div className="search__container">
//             Logged in as
//              <div>{name}</div>
//              <div>{user?.email}</div>
//              <input
//                 type="text"
//                 className="search__textBox"
//                 value={keyword}
//                 onChange={(e) => setKeyword(e.target.keyword)}
//                 placeholder="Search for:"
//                 />
//              <button className="search__btn" onClick={queryCuisine}>
//               Search Spoonacular
//              </button>

//            </div>
//          </div>
//       );
//     }
//     export default Search;