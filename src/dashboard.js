import React from "react"; // Mengimpor React untuk membuat komponen
import { Button, Box, Typography } from "@mui/material"; // Mengimpor komponen dari Material-UI untuk UI
import { useNavigate } from "react-router-dom"; // Mengimpor hook useNavigate untuk navigasi antar halaman
import PeopleIcon from "@mui/icons-material/People"; // Mengimpor ikon People untuk tombol
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"; // Mengimpor ikon BusinessCenter untuk tombol
import Navbar from './component/Navbar'; // Mengimpor komponen Navbar yang akan ditampilkan di halaman ini

const Dashboard = () => {
  const navigate = useNavigate(); // Hook untuk menavigasi ke halaman lain menggunakan `navigate`

  const handleGoToDataGuru = () => {
    navigate("/dataguru"); // Fungsi ini akan mengarahkan pengguna ke halaman /dataguru
  };

  const handleGoToDataMurid = () => {
    navigate("/datamurid"); // Fungsi ini akan mengarahkan pengguna ke halaman /datamurid
  };

  return (
    <>
      <Navbar /> {/* Menampilkan komponen Navbar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Mengatur konten dalam kolom
          alignItems: "center", // Mengatur konten agar terpusat secara horizontal
          justifyContent: "center", // Mengatur konten agar terpusat secara vertikal
          minHeight: "100vh", // Menjamin bahwa Box memiliki tinggi minimal 100% dari viewport
          background: "linear-gradient(135deg, #2C3E50, #34495E)", // Background dengan gradien warna
          padding: { xs: 2, sm: 4 }, // Padding yang responsif (lebih besar di layar lebih besar)
          boxSizing: "border-box", // Memastikan ukuran elemen memperhitungkan padding
        }}
      >
        <Typography
          variant="h3" // Menggunakan ukuran font h3 untuk judul
          gutterBottom
          sx={{
            fontFamily: "'Cinzel', serif", // Font untuk teks
            fontWeight: "700", // Tebal font
            color: "#F39C12", // Warna font
            textAlign: "center", // Teks di tengah
            letterSpacing: 2, // Spasi antara huruf
            marginBottom: 4, // Margin bawah
            textTransform: "uppercase", // Mengubah teks menjadi huruf besar semua
            fontSize: { xs: "2rem", sm: "3rem" }, // Ukuran font yang responsif (lebih besar di layar lebih besar)
          }}
        >
          Welcome to Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Mengatur konten dalam kolom
            alignItems: "center", // Menempatkan konten di tengah secara horizontal
            gap: 3, // Jarak antara elemen
            padding: 4, // Padding di dalam Box
            borderRadius: "16px", // Menambahkan sudut melengkung pada box
            background: "rgba(255, 255, 255, 0.1)", // Background semi-transparan
            backdropFilter: "blur(10px)", // Efek blur pada background
            boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)", // Menambahkan bayangan pada Box
            width: "90%", // Lebar Box 90% dari lebar parent
            maxWidth: 500, // Lebar maksimal Box 500px
          }}
        >
          <Button
            variant="contained" // Tombol dengan latar belakang penuh
            sx={{
              width: "100%", // Tombol mengambil lebar penuh
              padding: "16px 24px", // Padding di dalam tombol
              background: "linear-gradient(135deg, #F39C12, #F1C40F)", // Gradien warna latar belakang tombol
              color: "#fff", // Warna teks tombol
              fontFamily: "'Poppins', sans-serif", // Font untuk teks tombol
              fontWeight: "700", // Berat font tombol
              letterSpacing: 1.2, // Spasi antar huruf tombol
              fontSize: { xs: "1rem", sm: "1.2rem" }, // Ukuran font tombol yang responsif
              textTransform: "none", // Tidak mengubah teks menjadi kapital
              borderRadius: "12px", // Sudut tombol melengkung
            }}
            onClick={handleGoToDataGuru} // Fungsi yang dipanggil saat tombol diklik
            startIcon={<BusinessCenterIcon />} // Menambahkan ikon BusinessCenter di awal tombol
          >
            Teacher Data
          </Button>

          <Button
            variant="contained" // Tombol dengan latar belakang penuh
            sx={{
              width: "100%", // Tombol mengambil lebar penuh
              padding: "16px 24px", // Padding di dalam tombol
              background: "linear-gradient(135deg, #C0392B, #E74C3C)", // Gradien warna latar belakang tombol
              color: "#fff", // Warna teks tombol
              fontFamily: "'Poppins', sans-serif", // Font untuk teks tombol
              fontWeight: "700", // Berat font tombol
              letterSpacing: 1.2, // Spasi antar huruf tombol
              fontSize: { xs: "1rem", sm: "1.2rem" }, // Ukuran font tombol yang responsif
              textTransform: "none", // Tidak mengubah teks menjadi kapital
              borderRadius: "12px", // Sudut tombol melengkung
            }}
            onClick={handleGoToDataMurid} // Fungsi yang dipanggil saat tombol diklik
            startIcon={<PeopleIcon />} // Menambahkan ikon People di awal tombol
          >
            Student Data
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard; // Mengekspor komponen Dashboard agar bisa digunakan di tempat lain
