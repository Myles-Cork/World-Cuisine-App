//Based on: https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import SearchList from "./Search/SearchList";
import SearchMenu from "./Search/SearchMenu";
import NavBar from "./Navbar/NavBar";
import { auth, db, logout } from "../adapters/firebaseUtils";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const results = [
    {number: 0, name: "pizza"},
    {number: 1, name: "pasta"},
    {number: 2, name: "soup"},
    {number: 3, name: "sandwich"},
    {number: 4, name: "sandwich"},
    {number: 5, name: "sandwich"},
    {number: 6, name: "sandwich"},
    {number: 7, name: "sandwich"},
    {number: 8, name: "sandwich"},
    {number: 9, name: "sandwich"}
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
        <div className="dashboard__container">
        Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
          Logout
          </button>
        </div>
      </div>
  );
}
export default Dashboard;
