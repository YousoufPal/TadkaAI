import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


const IngredientSearch = () => {
  const [ingredient, setIngredient] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/ingredient-search?ingredient=${ingredient}`);
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching ingredient data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
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

      {/* Results */}
      {result && (
        <div className="row">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-header">Ingredient Information</div>
              <div className="card-body">
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
      {result === null && ingredient && !loading && (
        <p className="text-center text-muted">No results found for "{ingredient}".</p>
      )}
    </div>
  );
};

export default IngredientSearch;
