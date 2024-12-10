import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link

const Navbar = () => {
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
              className={({ isActive }) => (isActive ? 'active' : '')}
              end // Ensures the "Home" link is active only on the exact path "/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipe-generator"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Recipe Generator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ingredient-identifier"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Ingredient Identifier
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ingredient-search"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Ingredient Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Feedback
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
