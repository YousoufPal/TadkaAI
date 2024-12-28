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
        <div className="navbar-brand">
          <span className="logo">TadkaAI</span>
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

          {/* Add Login/Signup or Logout */}
          {!isAuthenticated() ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
