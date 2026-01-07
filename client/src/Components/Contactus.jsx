import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import '../css/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    adress: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setFormData(prev => ({
      ...prev,
      phonenumber: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/contact/add', formData);
      if (response.status === 201) {
        swal({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
          buttons: false,
          timer: 1500
        }).then(() => {
          setSubmitted(true);
        });

        setFormData({
          name: '',
          email: '',
          phonenumber: '',
          adress: '',
          message: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-container">
        <div className="success-check"></div>
        <h1>Thank You!</h1>
        <p>Your message has been sent successfully. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <h1>Get In Touch</h1>
      <p style={{ textAlign: 'center', color: '#717171', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>
        Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
      </p>

      {error && <div className="error-message">{error}</div>}

      <div className="contact-content">
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phonenumber">Phone Number</label>
              <input 
                type="tel" 
                id="phonenumber" 
                name="phonenumber"  
                value={formData.phonenumber}
                onChange={handlePhoneChange}
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="(123) 456-7890"
              />
            </div>

            <div className="form-group">
              <label htmlFor="adress">Address</label>
              <input 
                type="text" 
                id="adress" 
                name="adress"  
                value={formData.adress}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-item">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> info@DYM.</p>
            <p><strong>Phone:</strong> +216 29 407 219</p>
            <p><strong>Hours:</strong> Monday - Friday, 9AM - 6PM</p>
          </div>

          <div className="info-item">
            <h3>Get Support</h3>
            <p>Our team is here to help you with any questions about properties, bookings, or hosting.</p>
          </div>

          <div className="contact-methods">
            <div className="method">
              <div className="method-icon">✉️</div>
              <h4>Email Us</h4>
              <p>We'll respond within 24 hours</p>
            </div>
            <div className="method">
              <div className="method-icon">📞</div>
              <h4>Call Us</h4>
              <p>Speak directly with our team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;