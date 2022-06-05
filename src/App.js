import './App.css';
import './Welcome.css';
import React from 'react';

import Welcome from './components/Welcome';
import Homepage from './components/Homepage';
import Slotmachine from './components/Slotmachine';
import Listpage from './components/Listpage';
import Lottery from './components/Lottery';

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
          <Route path="/slotmachine" element={<Slotmachine />} />
          <Route path="/listpage" element={<Listpage />} />
          <Route path="/lottery" element={<Lottery />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;