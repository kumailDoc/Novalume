import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [exoplanet, setExoplanet] = useState()
  const [complexity, setComplexity] = useState()
  const navigate = useNavigate()

  const handleSelection = (setter) => (e) => {
    setter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/StarMap', {
      state: { exoplanet, complexity }
    })


  }
  return (
    <div className="Home">
      <div className="container">
        <div className="form">
          <Form onSubmit={handleSubmit} >
            <h1>Novalume</h1>
            <h2>The universe from a different prespective!</h2>
            <h3 className="description">Select an exoplanet and the complexity to generate map.</h3>
            <Form.Group className="form-group">
              <div className="inner-group">
                <Form.Label>Exoplanet</Form.Label>
                <Form.Control as="select" value={exoplanet} onChange={handleSelection(setExoplanet)}>
                  <option value="">Choose an Option</option>
                  <option value="Kepler-186f">Kepler-186f</option>
                  <option value="Kepler-452b">Kepler-452b</option>
                  <option value="Proxima Centauri b">Proxima Centauri b</option>
                  <option value="CoRoT-7b">CoRoT-7b</option>
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group className="form-group">
              <div className="inner-group">
                <Form.Label>Complexity Level</Form.Label>
                <Form.Control as="select" value={complexity} onChange={handleSelection(setComplexity)}>
                  <option value="">Choose an Option</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group className="form-group">
              <Button className="submit-btn" type="submit">Generate Map!</Button>
            </Form.Group>
          </Form>

          <a className="links" href="https://github.com/kumailDoc/Novalume" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          <a className="links" href="https://github.com/kumailDoc/Novalume" target="_blank" rel="noopener noreferrer">
            Website
          </a>
          <Link className="links" to="/About">About</Link>
          <Link className="links" to="/Privacy">Privacy</Link>

        </div>
      </div>
    </div>
  );

}

export default Home