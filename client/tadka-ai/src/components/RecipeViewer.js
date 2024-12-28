import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeViewer = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to access your saved recipes.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/saved-recipes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setRecipes(data.recipes);
        } else {
          alert(data.error || "Failed to fetch recipes.");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("An error occurred while fetching recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Your Saved Recipes</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center text-muted">
          <p>No recipes saved yet. Start generating and saving some!</p>
        </div>
      ) : (
        <div className="row gy-4">
          {recipes.map((recipe, index) => (
            <div className="col-md-6 col-lg-4" key={recipe._id || index}>
              <div className="card shadow h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Recipe {index + 1}</h5>
                  <pre className="card-text flex-grow-1" style={{ whiteSpace: 'pre-wrap' }}>
                    {recipe.recipeText}
                  </pre>
                  <button className="btn btn-outline-danger mt-3">
                    Delete Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeViewer;
