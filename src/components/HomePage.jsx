import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [exoplanet, setExoplanet] = useState()
  const [difficulty, setDifficulty] = useState()
  const navigate = useNavigate()

  const handleSelection = (setter) => (e) => {
    setter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/StarMap', {
      state: { exoplanet, difficulty }
    })

    //for post to backend
    //const data = {exoplanet, difficulty}

    // try {
    //   // Send POST request to Flask backend
    //   const response = await axios.post('http://localhost:5000/process', data);
    //   console.log(response.data);

    //   navigate('/StarMap');
    // } catch (error) {
    //   console.error('Error sending data to backend:', error);
    // }
  
}
return (
  <div className="Home">
    <div className="container">
      <div className="form">
        <Form onSubmit={handleSubmit} >
          <h1>Novalume</h1>
          <h2>The universe from a different prespective!</h2>
          <h3 className="description">Select an exoplanet and the difficulty to generate map.</h3>
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
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control as="select" value={difficulty} onChange={handleSelection(setDifficulty)}>
                <option value="">Choose an Option</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
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