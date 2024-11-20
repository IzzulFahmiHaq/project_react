// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './component/navbar'; // Periksa ini
import Dashboard from './dashboard';
import Dataguru from './dataguru';
import Datamurid from './datamurid';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard "/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dataguru" element={<Dataguru/>} />
          <Route path="/datamurid" element={<Datamurid/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
