//Based on: https://blog.logrocket.com/user-authentication-firebase-react-apps/

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import FirebaseAdapter from "../adapters/FirebaseAdapter";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(FirebaseAdapter.getAuth());
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const q = query(collection(FirebaseAdapter.getDB(), "users"), where("uid", "==", user?.uid));
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
          <button className="dashboard__btn" onClick={FirebaseAdapter.logout}>
          Logout
          </button>
        </div>
      </div>
  );
}
export default Dashboard;
