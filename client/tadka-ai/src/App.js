import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeGenerator from './components/RecipeGenerator';
import IngredientIdentifier from './components/IngredientIdentifier'; 
import IngredientSearch from "./components/IngredientSearch"; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/ingredient-identifier" element={<IngredientIdentifier />} />
        <Route path="/ingredient-search" element={<IngredientSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
