import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import SearchPage from "./Search/SearchPage";
import TopPage from "./TopRecipes/TopPage";
import FavPage from "./Favorites/FavPage";
import CreatePage from "./Create/CreatePage";
import Dashboard from "./Dashboard";

class HomePage extends React.Component {

  render(){

    return (
        <div>
          <NavBar/>
          <Routes>
            <Route path="search" element={<SearchPage />} />
            <Route path="top" element={<TopPage />} />
            <Route path="favorites" element={<FavPage />} />
            <Route path="create" element={<CreatePage />} />
          </Routes>
          <Dashboard/>
        </div>
      );
  }
}
export default HomePage;


