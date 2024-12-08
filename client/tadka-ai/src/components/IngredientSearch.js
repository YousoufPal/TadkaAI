import React, { useState } from "react";
// import "./IngredientSearch.css";
// import "../App.css"

const IngredientSearch = () => {
  const [ingredient, setIngredient] = useState("");
  const [images, setImages] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient name.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8000/ingredient-search?ingredient=${ingredient}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setImages(data.images || []);
        setRetailers(data.retailers || []);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Ingredient Search</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter ingredient name..."
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && <div className="text-center">Loading...</div>}

      <div className="row">
        <div className="col-12 col-md-6">
          <div className="mb-4">
            <h3>Ingredient Images</h3>
            {images.length > 0 ? (
              <div className="row">
                {images.map((img, idx) => (
                  <div className="col-6 col-md-4 mb-3" key={idx}>
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                ))}
              </div>
            ) : (
              !loading && <p>No images found.</p>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="mb-4">
            <h3>Retailers</h3>
            {retailers.length > 0 ? (
              <ul className="list-group">
                {retailers.map((retailer, idx) => (
                  <li className="list-group-item" key={idx}>
                    <strong>{retailer.name}</strong>
                    <p>{retailer.address}</p>
                    {retailer.rating && (
                      <p>
                        <strong>Rating:</strong> {retailer.rating}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p>No retailers found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientSearch;
