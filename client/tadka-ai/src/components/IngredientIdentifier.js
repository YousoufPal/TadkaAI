import React, { useState } from 'react';

const IngredientIdentifier = () => {
  const [image, setImage] = useState(null);
  const [identifiedIngredient, setIdentifiedIngredient] = useState('');
  const [rawLabels, setRawLabels] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const identifyIngredient = async () => {
    try {
      const response = await fetch('http://localhost:8000/identify-ingredient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: image }),
      });

      const data = await response.json();

      if (data.ingredients) {
        setIdentifiedIngredient(data.ingredients.join(', '));
        setRawLabels(data.ingredients);
      } else {
        console.error('Unexpected response structure:', data);
      }
    } catch (error) {
      console.error('Error identifying ingredient:', error.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center min-vh-100 bg-light">
      <div className="container text-center">
        <h2 className="mb-4">Ingredient Identifier</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control mb-3" />
        <button className="btn btn-primary mt-3" onClick={identifyIngredient}>
          Identify Ingredient
        </button>
        {identifiedIngredient && (
          <div className="mt-4">
            <h4>Identified Ingredient:</h4>
            <p className="text-success">{identifiedIngredient}</p>
          </div>
        )}
        {rawLabels.length > 0 && (
          <div className="mt-3">
            <h5>Raw Labels:</h5>
            <ul className="list-unstyled">
              {rawLabels.map((label, index) => (
                <li key={index}>{label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientIdentifier;
