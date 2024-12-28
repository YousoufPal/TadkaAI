import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeGenerator from './components/RecipeGenerator';
import IngredientIdentifier from './components/IngredientIdentifier'; 
import IngredientSearch from "./components/IngredientSearch"; 
import './App.css';
import HomePage from './components/HomePage';
import Signup from "./components/Signup";
import Login from "./components/Login";
import RecipeViewer from './components/RecipeViewer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/ingredient-identifier" element={<IngredientIdentifier />} />
        <Route path="/ingredient-search" element={<IngredientSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/saved-recipes" element={<RecipeViewer />} />


      </Routes>
    </Router>
  );
}

export default App;
