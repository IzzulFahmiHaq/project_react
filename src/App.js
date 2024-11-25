import React from 'react'; // Mengimpor React untuk membuat komponen
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'; // Mengimpor komponen untuk routing dari React Router
import Navbar from './component/Navbar'; // Mengimpor komponen Navbar
import DataMurid from './Murid/datamurid'; // Mengimpor komponen DataMurid
import DataGuru from './Guru/dataguru'; // Mengimpor komponen DataGuru
import Tambah from './Murid/tambah'; // Mengimpor komponen untuk menambah data murid
import EditMurid from './Murid/editmurid'; // Mengimpor komponen untuk mengedit data murid
import TambahGuru from './Guru/tambahguru'; // Mengimpor komponen untuk menambah data guru
import Dashboard from './dashboard'; // Mengimpor komponen Dashboard
import EditGuru from './Guru/editguru'; // Mengimpor komponen untuk mengedit data guru

const App = () => {
  return (
    <Router> {/* Pastikan Router membungkus seluruh aplikasi untuk mengelola routing */}
      <AppRoutes /> {/* Memanggil komponen AppRoutes untuk menangani pengaturan rute */}
    </Router>
  );
};

// Komponen terpisah untuk menangani pengaturan rute aplikasi
const AppRoutes = () => {
  const location = useLocation(); // Hook untuk mendapatkan lokasi saat ini (path) di browser

  return (
    <>
      {/* Menyembunyikan Navbar hanya di halaman Dashboard */}
      {location.pathname !== '/dashboard' && <Navbar />} {/* Navbar hanya ditampilkan jika path bukan /dashboard */}

      <div style={{ padding: '20px' }}> {/* Memberikan padding pada konten utama */}
        <Routes> {/* Komponen Routes untuk mendefinisikan rute-rute dalam aplikasi */}
          <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Rute default, mengarahkan ke /dashboard */}
          <Route path="/dataguru" element={<DataGuru />} /> {/* Rute untuk halaman DataGuru */}
          <Route path="/datamurid" element={<DataMurid />} /> {/* Rute untuk halaman DataMurid */}
          <Route path="/tambah" element={<Tambah />} /> {/* Rute untuk halaman Tambah Murid */}
          <Route path="/editmurid/:id" element={<EditMurid />} /> {/* Rute untuk halaman Edit Murid, dengan parameter id */}
          <Route path="/tambahguru" element={<TambahGuru />} /> {/* Rute untuk halaman Tambah Guru */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Rute untuk halaman Dashboard */}
          <Route path="/editguru/:id" element={<EditGuru />} /> {/* Rute untuk halaman Edit Guru, dengan parameter id */}
        </Routes>
      </div>
    </>
  );
};

export default App; // Mengekspor komponen App agar bisa digunakan di tempat lain
