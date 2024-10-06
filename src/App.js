import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'
import StarMap from './components/StarMap';
import About from './components/About';
import Privacy from './components/Privacy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/StarMap' Component={StarMap}/>
        <Route path='/About' Component={About}/>
        <Route path='/Privacy' Component={Privacy}/>
      </Routes>
    </Router>
    
  );
}

export default App;
