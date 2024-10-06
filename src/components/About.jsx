import React from 'react';
import './About.css'; 
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

const teamMembers = [
  {
    name: 'Brian Doung',
    image: '/images/brian.jpeg', 
    description: 'Software Developer'
  },
  {
    name: 'Zhenqiao Wang',
    image: '/images/michelle.jpeg', 
    description: 'Software Developer'
  },
  {
    name: 'Kumail Doctor',
    image: '/images/kumail.jpg', 
    description: 'Software Developer'
  },
  {
    name: 'Irin Cibi',
    image: '/images/irincibi.jpeg', 
    description: 'Software Developer'
  },
  {
    name: 'Aron Joseph',
    image: '/images/aron.jpeg', 
    description: 'Software Developer'
  }
];

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <div className="about-page">
      <Link className="links" to="/"><Button className="back-button" type="submit">Back to Homepage</Button></Link>
        <div className="project-info">
          <h1>Novalume</h1>
          <p>
            Novalume is a captivating, educational app designed to ignite the imagination of young astronomy enthusiasts, especially students. Developed with Python and React, Novalume takes users on an immersive, interactive journey through the cosmos, allowing them to explore the night sky from the perspective of distant exoplanets. Powered by real data from the Gaia mission, the app features scientifically accurate star maps, offering a dynamic and engaging tool for stargazing across the galaxy.
          </p>
        </div>
  
        <div className="team-section">
          <h2>About the Team</h2>
          <div className="team-cards">
            {teamMembers.map((member, index) => (
              <div className="team-card" key={index}>
                <img src={member.image} alt={member.name} className="team-image" />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
