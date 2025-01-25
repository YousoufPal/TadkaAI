import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); // Remove the token from localStorage
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={require("../assets/logo.jpg")} alt="TadkaAI Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipe-generator"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Recipe Generator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ingredient-identifier"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Ingredient Identifier
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ingredient-search"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Ingredient Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-recipes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Saved Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Feedback
            </NavLink>
          </li>
        </ul>
        <div className="auth-buttons">
          {!isAuthenticated() ? (
            <>
              <button className="btn login-btn" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="btn signup-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          ) : (
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
