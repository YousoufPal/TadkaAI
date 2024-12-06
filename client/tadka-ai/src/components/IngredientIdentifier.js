import React, { useState } from 'react';

const IngredientIdentifier = () => {
  const [ingredientImage, setIngredientImage] = useState(null);
  const [ingredientLabels, setIngredientLabels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    setIngredientImage(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (!ingredientImage) {
      alert("Please upload an image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', ingredientImage);

    fetch('http://localhost:8000/identify-ingredient', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setIngredientLabels(data.labels || ['No ingredients found']);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error identifying ingredients:', error);
        setLoading(false);
      });
  };

  return (
    <div className="ingredient-identifier-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container">
        <h3 className="text-center mb-4">Ingredient Identifier</h3>
        <div className="mb-3">
          <label htmlFor="ingredientImage" className="form-label">
            Upload Ingredient Image
          </label>
          <input
            type="file"
            id="ingredientImage"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Identifying...' : 'Identify Ingredient'}
        </button>

        {/* Display identified ingredients */}
        <div className="ingredient-output mt-4">
          <h4>Identified Ingredients:</h4>
          <ul>
            {ingredientLabels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientIdentifier;
