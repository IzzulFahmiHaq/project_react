import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import DataMurid from './Murid/datamurid';
import DataGuru from './Guru/dataguru';
import Tambah from './Murid/tambah';
import EditMurid from './Murid/editmurid';
import TambahGuru from './Guru/tambahguru';
import Dashboard from './dashboard';
import EditGuru from './Guru/editguru';

const App = () => {
  return (
    <Router> {/* Pastikan Router membungkus seluruh aplikasi */}
      <AppRoutes />
    </Router>
  );
};

// Komponen terpisah untuk menambahkan logika Navbar
const AppRoutes = () => {
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini

  return (
    <>
      {/* Menyembunyikan Navbar hanya di halaman Dashboard */}
      {location.pathname !== '/dashboard' && <Navbar />}

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dataguru" element={<DataGuru />} />
          <Route path="/datamurid" element={<DataMurid />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/editmurid/:id" element={<EditMurid />} />
          <Route path="/tambahguru" element={<TambahGuru />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editguru/:id" element={<EditGuru />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
