import React, { useState } from "react";
import { getToken } from "../services/authService"; // Import the getToken function
import "bootstrap/dist/css/bootstrap.min.css";

const IngredientSearch = () => {
  const [ingredient, setIngredient] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    setErrorMessage(""); // Clear any existing error messages

    try {
      const token = getToken(); // Retrieve the token using getToken
      if (!token) {
        throw new Error("No token found. User might not be authenticated.");
      }

      const response = await fetch(
        `http://localhost:8000/ingredient-search?ingredient=${ingredient}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        console.error("Unexpected response structure:", data);
        setErrorMessage("Failed to fetch ingredient data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching ingredient data:", error.message);
      setErrorMessage("Failed to fetch ingredient data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row pt-4">
        <div className="col-12">
          <h2 className="text-center mb-4">Ingredient Search</h2>
        </div>
        <div className="col-12 col-md-8 mx-auto">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for an ingredient..."
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading || !ingredient}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Display Error Message */}
      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="row">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-header">Ingredient Information</div>
              <div className="card-body">
                {/* Images */}
                <h5 className="card-title">Images</h5>
                <div className="row">
                  {result.images && result.images.length > 0 ? (
                    result.images.map((image, index) => (
                      <div className="col-12 col-md-4 mb-3" key={index}>
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="img-fluid rounded shadow-sm"
                        />
                      </div>
                    ))
                  ) : (
                    <p>No images found.</p>
                  )}
                </div>

                {/* Places */}
                <h5 className="card-title mt-4">Places</h5>
                <ul className="list-group">
                  {result.places && result.places.length > 0 ? (
                    result.places.map((place, index) => (
                      <li className="list-group-item" key={index}>
                        <h6>{place.name}</h6>
                        <p>{place.address}</p>
                        <small>Rating: {place.rating}</small>
                      </li>
                    ))
                  ) : (
                    <p>No places found.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No results message */}
      {searched && !loading && result === null && (
        <p className="text-center text-muted">
          No results found for "{ingredient}".
        </p>
      )}
    </div>
  );
};

export default IngredientSearch;
