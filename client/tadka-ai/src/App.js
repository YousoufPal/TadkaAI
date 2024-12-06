import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeGenerator from './components/RecipeGenerator';
import IngredientIdentifier from './components/IngredientIdentifier'; // Import for the ingredient identifier page
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/ingredient-identifier" element={<IngredientIdentifier />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
