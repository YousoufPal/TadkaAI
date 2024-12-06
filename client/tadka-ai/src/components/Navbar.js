import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="logo">TadkaAI</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/recipe-generator">Recipe Generator</Link></li>
          <li><Link to="/ingredient-identifier">Ingredient Identifier</Link></li>
          <li><Link to="/ingredient-search">Ingredient Search</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
