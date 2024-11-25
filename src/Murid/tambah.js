import React, { useState } from "react"; // Mengimpor React dan hook useState untuk mengelola state komponen
import axios from "axios"; // Mengimpor axios untuk melakukan request HTTP
import { useNavigate } from "react-router-dom"; // Mengimpor useNavigate untuk navigasi antar route
import TextField from "@mui/material/TextField"; // Mengimpor komponen TextField dari Material-UI untuk input field
import Button from "@mui/material/Button"; // Mengimpor komponen Button dari Material-UI
import Typography from "@mui/material/Typography"; // Mengimpor komponen Typography dari Material-UI untuk teks
import Box from "@mui/material/Box"; // Mengimpor komponen Box dari Material-UI untuk layout
import Paper from "@mui/material/Paper"; // Mengimpor komponen Paper dari Material-UI untuk membuat kontainer mirip kertas
import Swal from "sweetalert2"; // Mengimpor SweetAlert2 untuk menampilkan pop-up alert

// Komponen fungsional untuk menambah murid baru
export default function Tambah() {
  // Mendefinisikan variabel state untuk mengelola input form
  const [namaMurid, setNamaMurid] = useState("");  
  const [kelas, setKelas] = useState("");  
  const [jurusan, setJurusan] = useState("");  
  const [asalsekolah, setAsalSekolah] = useState("");  
  const navigate = useNavigate(); // Hook untuk navigasi programatik ke route lain

  // Fungsi handleSubmit untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah perilaku pengiriman form secara default

    // Validasi sederhana untuk memastikan semua field diisi
    if (!namaMurid || !kelas || !jurusan || !asalsekolah) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error"); // Menampilkan pesan error jika ada field yang kosong
      return;
    }

    try {
      // Melakukan request GET untuk mengambil data murid yang sudah ada dari API
      const response = await axios.get("http://localhost:3030/murids");
      const murids = response.data; // Mengambil data (list murid) dari response API
      const nomorUrut = murids.length + 1; // Menentukan ID murid berikutnya berdasarkan jumlah murid yang ada

      // Membuat objek murid baru berdasarkan data form
      const newMurid = {
        id: nomorUrut.toString(),
        no: nomorUrut,
        namaMurid,
        kelas: parseInt(kelas), // Mengubah kelas menjadi integer
        jurusan,
        asalsekolah,
      };

      // Melakukan request POST untuk menambahkan murid baru ke API
      await axios.post("http://localhost:3030/murids", newMurid);

      // Menampilkan alert sukses jika murid berhasil ditambahkan
      Swal.fire("Berhasil!", "Murid berhasil ditambahkan.", "success");
      
      // Navigasi ke halaman "/datamurid" setelah murid berhasil ditambahkan
      navigate("/datamurid");
    } catch (error) {
      console.error("Error adding murid:", error); // Menampilkan error di console jika terjadi kesalahan pada request API
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan murid.", "error"); // Menampilkan alert error
    }
  };

  return (
    <Box
      sx={{
        display: "flex", // Menggunakan flexbox untuk menata konten
        justifyContent: "center", // Menyusun elemen secara horizontal di tengah
        alignItems: "center", // Menyusun elemen secara vertikal di tengah
        height: "100vh", // Membuat tinggi konten sesuai tinggi viewport
        backgroundColor: "#ECF0F1", // Warna latar belakang halaman
      }}
    >
      {/* Paper adalah komponen untuk membuat kontainer dengan efek bayangan (shadow) */}
      <Paper
        elevation={6}
        sx={{
          p: 4, // Padding di dalam Paper
          width: "400px", // Lebar Paper yang tetap
          display: "flex", // Menggunakan flexbox untuk layout
          flexDirection: "column", // Menyusun elemen form secara vertikal
          gap: 2, // Spasi antara elemen form
          backgroundColor: "#2C3E50", // Warna latar belakang Paper
        }}
      >
        <Typography
          variant="h5" // Menggunakan varian h5 untuk judul
          sx={{
            textAlign: "center", // Menyusun teks secara horizontal di tengah
            mb: 2, // Margin bawah untuk memberi jarak
            color: "#F39C12", // Warna teks judul
            fontWeight: "bold", // Menebalkan teks
          }}
        >
          Tambah Daftar Murid Baru {/* Teks judul */}
        </Typography>
        {/* Form untuk menangani pengiriman data */}
        <form onSubmit={handleSubmit}>
          {/* Input field untuk Nama Murid */}
          <TextField
            label="Nama Murid"
            variant="outlined"
            fullWidth
            value={namaMurid}
            onChange={(e) => setNamaMurid(e.target.value)} // Mengubah nilai state namaMurid sesuai input
            sx={{
              mb: 2, // Margin bawah
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input field
              },
            }}
          />
          {/* Input field untuk Kelas */}
          <TextField
            label="Kelas"
            variant="outlined"
            fullWidth
            type="number" // Mengizinkan hanya angka
            value={kelas}
            onChange={(e) => setKelas(e.target.value)} // Mengubah nilai state kelas sesuai input
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
              },
            }}
          />
          {/* Input field untuk Jurusan */}
          <TextField
            label="Jurusan"
            variant="outlined"
            fullWidth
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)} // Mengubah nilai state jurusan sesuai input
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
              },
            }}
          />
          {/* Input field untuk Asal Sekolah */}
          <TextField
            label="Asal Sekolah"
            variant="outlined"
            fullWidth
            value={asalsekolah}
            onChange={(e) => setAsalSekolah(e.target.value)} // Mengubah nilai state asalSekolah sesuai input
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
              },
            }}
          />
          {/* Kontainer untuk tombol aksi */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            {/* Tombol "Batal" untuk kembali ke halaman dashboard */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dashboard")} // Navigasi kembali ke halaman "/dashboard"
              sx={{ backgroundColor: "#F39C12" }} // Warna latar belakang tombol
            >
              Batal
            </Button>
            {/* Tombol "Simpan" untuk mengirimkan form */}
            <Button
              variant="contained"
              color="primary"
              type="submit" // Mengirimkan form saat diklik
              sx={{
                backgroundColor: "#2C3E50", // Warna latar belakang tombol
                '&:hover': { backgroundColor: "#F39C12" }, // Efek hover pada tombol
              }}
            >
              Simpan
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
