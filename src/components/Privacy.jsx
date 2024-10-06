import React from 'react';
import './About.css'; 
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Privacy = () => {
  return (
    <div className="about-page-container">
      <div className="about-page">
      <Link className="links" to="/"><Button className="back-button" type="submit">Back to Homepage</Button></Link>
        <div className="project-info">
          <h1>Privacy Policy</h1>
          <p>
            At Novalume, we prioritize your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and share information about you when you use our services.
          </p>
          <h2>Data Security</h2>
          <p>
            We implement industry-standard measures to protect your data, but please be aware that no security measure is completely infallible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
