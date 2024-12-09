import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="bg-light">

      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to TadkaAI</h1>
          <p className="lead">
            Discover the magic of South Asian cuisine with AI. Find recipes, identify ingredients, and explore local stores effortlessly.
          </p>
          <a href="#search" className="btn btn-warning btn-lg mt-3">Start Your Journey</a>
        </div>
      </header>

      <section id="features" className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose TadkaAI?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5 className="card-title">AI-Powered Ingredient Search</h5>
                  <p className="card-text">
                    Point your camera at an ingredient, and we'll identify it instantly.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5 className="card-title">Local Store Recommendations</h5>
                  <p className="card-text">
                    Find nearby stores to purchase authentic South Asian ingredients.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5 className="card-title">Curated Recipes</h5>
                  <p className="card-text">
                    Get delicious, easy-to-follow recipes tailored to your preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
