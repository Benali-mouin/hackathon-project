import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Category.css';

function Category() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/category/getall');
      setCategories(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleViewAllClick = () => {
    navigate('/estate');
  };

  const handleCategoryClick = (id, name) => {
    navigate(`/estate?category=${id}&categoryName=${encodeURIComponent(name)}`);
  };

  if (loading) {
    return (
      <div className="category-container">
        <div className="text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '20px', color: 'var(--airbnb-gray)', fontWeight: '500' }}>Loading amazing categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button 
          onClick={fetchCategories} 
          style={{
            display: 'block',
            margin: '30px auto 0',
            padding: '12px 30px',
            background: 'var(--gradient-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="category-container">
      <h1 className="category-title">Explore Our Property Categories</h1>
      <button onClick={handleViewAllClick} className="view-all-btn">
        View All Properties →
      </button>

      {categories.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px', 
          color: 'var(--airbnb-gray)', 
          fontSize: '1.2rem',
          background: 'var(--airbnb-lighter-gray)',
          borderRadius: 'var(--radius-lg)',
          marginTop: '40px'
        }}>
          No categories available at the moment.
        </div>
      ) : (
        <section className="category-grid">
          {categories.map((category) => (
            <div 
              className="category-card" 
              key={category.id || category._id}
              onClick={() => handleCategoryClick(category.id || category._id, category.name)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCategoryClick(category.id || category._id, category.name);
                }
              }}
            >
              {category.img && (
                <img
                  src={category.img}
                  className="category-img"
                  alt={category.name}
                  loading="lazy"
                />
              )}
              <div className="category-body">
                <h5 className="category-name">
                  {category.name}
                </h5>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default Category;