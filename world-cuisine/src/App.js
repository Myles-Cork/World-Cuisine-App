import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Reset from "./components/Login/Reset";
import HomePage from "./components/HomePage";
import SearchPage from "./components/Search/SearchPage";
import TopPage from "./components/TopRecipes/TopPage";


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/home/*" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
