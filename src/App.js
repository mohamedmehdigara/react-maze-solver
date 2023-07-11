import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Maze from './components/Maze';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Maze Solver</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Maze />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
