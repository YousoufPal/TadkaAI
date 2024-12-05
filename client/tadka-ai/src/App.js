import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';

const RecipeCard = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState([]);
  const [mealType, setMealType] = useState("Breakfast");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("Less than 30 minutes");
  const [complexity, setComplexity] = useState("Beginner");

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };
    if (onSubmit) {
      onSubmit(recipeData);
    }
  };

  return (
    <div className="card shadow-lg p-4 w-100">
      <h3 className="card-title text-center mb-4">Recipe Generator</h3>
      <div className="mb-3">
        <label htmlFor="ingredients" className="form-label">
          Ingredients
        </label>
        <input
          type="text"
          id="ingredients"
          className="form-control"
          placeholder="Enter ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="mealType" className="form-label">
          Meal Type
        </label>
        <select
          id="mealType"
          className="form-select"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="cuisine" className="form-label">
          Cuisine Preference
        </label>
        <input
          type="text"
          id="cuisine"
          className="form-control"
          placeholder="e.g., Italian, Mexican"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cookingTime" className="form-label">
          Cooking Time
        </label>
        <select
          id="cookingTime"
          className="form-select"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        >
          <option value="Less than 30 minutes">Less than 30 minutes</option>
          <option value="30-60 minutes">30-60 minutes</option>
          <option value="More than 1 hour">More than 1 hour</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="complexity" className="form-label">
          Complexity
        </label>
        <select
          id="complexity"
          className="form-select"
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={handleSubmit}
      >
        Generate Recipe
      </button>
    </div>
  );
};

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  let eventSourceRef = useRef(null);

  useEffect(() => {
    if (recipeData) {
      closeEventStream();
      initialiseEventStream();
    }
  }, [recipeData]);

  const initialiseEventStream = () => {
    const recipeInputs = { ...recipeData };
    const queryParams = new URLSearchParams(recipeInputs).toString();
    const url = `http://localhost:8000/recipestream?${queryParams}`;

    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.action === "close") {
        closeEventStream();
      } else if (data.action === "chunk") {
        setRecipeText((prev) => prev + "\n" + data.chunk);
      } else if (data.action === "error") {
        console.error("Error received from server:", data.message);
        closeEventStream();
      }
    };

    eventSourceRef.current.onerror = () => {
      console.error("Error with SSE connection.");
      closeEventStream();
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  const onSubmit = (data) => {
    setRecipeText("");
    setRecipeData(data);
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="container">
          <div className="recipe-container">
            <div className="recipe-card">
              <RecipeCard onSubmit={onSubmit} />
            </div>
            <div
              className="recipe-output"
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
              }}
            >
              {recipeText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
