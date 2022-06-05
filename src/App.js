import './App.css';
import './Welcome.css';
import React from 'react';
import Listpage from './components/Listpage';
import Lottery from './components/Lottery';

import Welcome from './components/Welcome';
import Homepage from './components/Homepage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/listpage" element={<Listpage />} />
          <Route path="/lottery" element={<Lottery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
