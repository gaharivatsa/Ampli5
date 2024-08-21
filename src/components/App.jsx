import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './Navbar';
import ResumeEnhance from './resume_enhace';
import Similarity from './similarity';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ResumeEnhance />} />
        <Route path="/similarity" element = {<Similarity />} />
      </Routes>
    </Router>
  );
};

export default App;
