import React from 'react';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="logo">TadkaAI</span>
        </div>
        <ul className="nav-links">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/recipe-generator">Recipe Generator</a></li>
          <li><a href="/ingredient-identifier">Ingredient Identifier</a></li>
          <li><a href="/ingredient-search">Ingredient Search</a></li>
          <li><a href="/feedback">Feedback</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 