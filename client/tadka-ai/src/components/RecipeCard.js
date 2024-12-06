import React, { useState } from 'react';

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('Breakfast');
  const [cuisine, setCuisine] = useState('');
  const [cookingTime, setCookingTime] = useState('Less than 30 minutes');
  const [complexity, setComplexity] = useState('Beginner');
  const [recipeText, setRecipeText] = useState('');

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      cuisine,
      cookingTime,
      complexity,
    };

    // Assuming your backend API is still active to generate a recipe
    fetchRecipeData(recipeData);
  };

  const fetchRecipeData = async (data) => {
    const queryParams = new URLSearchParams(data).toString();
    const url = `http://localhost:8000/recipestream?${queryParams}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.action === 'chunk') {
        setRecipeText((prev) => prev + "\n" + data.chunk);
      } else if (data.action === 'close') {
        eventSource.close();
      } else if (data.action === 'error') {
        console.error("Error received from server:", data.message);
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      console.error("Error with SSE connection.");
      eventSource.close();
    };
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container">
        <div className="recipe-container">
          <div className="recipe-card card shadow-lg p-4 w-100">
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
          <div
            className="recipe-output mt-4"
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
            }}
          >
            {recipeText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;
