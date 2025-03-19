import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';
import homePageBanner from '../assets/homePageBanner.png';

const HomePage = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-banner" style={{ backgroundImage: `url(${homePageBanner})` }}></div>
        <div className="hero-content">
          <div className="container position-relative">
            <h1 className="hero-title">Welcome to TadkaAI</h1>
            <p className="hero-text">
              Discover the magic of South Asian cuisine with AI. 
              From traditional recipes to modern fusion, let our AI guide your culinary journey.
            </p>
            <Link to="/recipe-generator" className="cta-button">
              Start Cooking <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container position-relative">
          <h2 className="section-title reveal">Why Choose TadkaAI?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card reveal">
                <div className="feature-icon">🔍</div>
                <h3>Smart Ingredient Detection</h3>
                <p>Point your camera at any ingredient and our AI will identify it instantly, providing detailed information about its use in South Asian cooking.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card reveal">
                <div className="feature-icon">🏪</div>
                <h3>Local Store Finder</h3>
                <p>Discover authentic South Asian grocery stores near you, complete with ingredient availability and store ratings.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card reveal">
                <div className="feature-icon">👨‍🍳</div>
                <h3>Personalized Recipes</h3>
                <p>Get AI-powered recipe recommendations based on your preferences, dietary restrictions, and cooking skill level.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recipe-showcase">
        <div className="container">
          <h2 className="section-title reveal">Popular Recipes</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="recipe-card reveal">
                <div className="recipe-image" style={{backgroundImage: 'url(https://source.unsplash.com/800x600/?biryani)'}}></div>
                <div className="recipe-content">
                  <h3>Hyderabadi Biryani</h3>
                  <p>Aromatic rice layered with tender meat and authentic spices</p>
                  <Link to="/recipe-generator" className="recipe-link">Cook Now →</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="recipe-card reveal">
                <div className="recipe-image" style={{backgroundImage: 'url(https://source.unsplash.com/800x600/?curry,indian)'}}></div>
                <div className="recipe-content">
                  <h3>Butter Paneer Masala</h3>
                  <p>Creamy curry with soft paneer in a rich tomato gravy</p>
                  <Link to="/recipe-generator" className="recipe-link">Cook Now →</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="recipe-card reveal">
                <div className="recipe-image" style={{backgroundImage: 'url(https://source.unsplash.com/800x600/?indian,dessert)'}}></div>
                <div className="recipe-content">
                  <h3>Gulab Jamun</h3>
                  <p>Soft milk dumplings soaked in aromatic sugar syrup</p>
                  <Link to="/recipe-generator" className="recipe-link">Cook Now →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-section">
        <div className="container">
          <h2 className="section-title reveal">Explore Cuisines</h2>
          <div className="explore-grid">
            <div className="explore-card reveal">
              <img src="https://source.unsplash.com/800x600/?indian,food" alt="Indian Cuisine" className="explore-image" />
              <div className="explore-content">
                <h3>Indian Cuisine</h3>
              </div>
            </div>
            <div className="explore-card reveal">
              <img src="https://source.unsplash.com/800x600/?pakistani,food" alt="Pakistani Cuisine" className="explore-image" />
              <div className="explore-content">
                <h3>Pakistani Cuisine</h3>
              </div>
            </div>
            <div className="explore-card reveal">
              <img src="https://source.unsplash.com/800x600/?bangladeshi,food" alt="Bangladeshi Cuisine" className="explore-image" />
              <div className="explore-content">
                <h3>Bangladeshi Cuisine</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="modern-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/recipe-generator">Recipe Generator</Link></li>
                <li><Link to="/ingredient-identifier">Ingredient Identifier</Link></li>
                <li><Link to="/ingredient-search">Store Finder</Link></li>
                <li><Link to="/saved-recipes">Saved Recipes</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Popular Cuisines</h3>
              <ul className="footer-links">
                <li><a href="#">North Indian</a></li>
                <li><a href="#">South Indian</a></li>
                <li><a href="#">Pakistani</a></li>
                <li><a href="#">Bangladeshi</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Stay Connected</h3>
              <div className="social-links">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">YouTube</a>
              </div>
              <h3 className="mt-4">Newsletter</h3>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button type="submit" className="newsletter-button">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="copyright">
            <p>© 2024 TadkaAI | Bringing AI to South Asian Cuisine</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
