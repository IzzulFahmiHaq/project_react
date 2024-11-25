import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function TambahGuru() {
  const [namaGuru, setNamaGuru] = useState("");  // Nama guru
  const [mataPelajaran, setMataPelajaran] = useState("");  // Mata Pelajaran
  const [gender, setGender] = useState("");  // Gender
  const [jabatan, setJabatan] = useState("");  // Jabatan
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!namaGuru || !mataPelajaran || !gender || !jabatan) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      // Dapatkan data guru untuk menghitung total guru yang ada
      const response = await axios.get("http://localhost:3030/Guru");  // Pastikan endpoint ini sesuai
      const gurus = response.data;

      // Penentuan nomor urut berdasarkan total data yang ada
      const nomorUrut = gurus.length + 1;

      // Buat data guru baru
      const newGuru = {
        id: nomorUrut.toString(),  // ID baru berdasarkan nomor urut
        no: nomorUrut,  // Nomor urut mulai dari 1 dan terus bertambah
        namaGuru,  // Field nama guru
        mataPelajaran,  // Field mata pelajaran
        gender,  // Field gender
        jabatan,  // Field jabatan
      };

      // Kirim data baru ke server
      await axios.post("http://localhost:3030/Guru", newGuru);  // Pastikan endpoint ini sesuai

      Swal.fire("Berhasil!", "Guru berhasil ditambahkan.", "success");
      navigate("/dataguru");  // Sesuaikan dengan halaman tujuan
    } catch (error) {
      console.error("Error adding guru:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan guru.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ECF0F1",  // Warna latar belakang halaman
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#2C3E50",  // Warna latar belakang form
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "#F39C12",  // Warna judul seperti pada tambah murid
            fontWeight: "bold",
          }}
        >
          Tambah Daftar Guru Baru
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Guru"
            variant="outlined"
            fullWidth
            value={namaGuru}  // Menghubungkan dengan state namaGuru
            onChange={(e) => setNamaGuru(e.target.value)}  // Menangani perubahan pada nama guru
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',  // Warna latar belakang input
              },
            }}
          />
          <TextField
            label="Mata Pelajaran"
            variant="outlined"
            fullWidth
            value={mataPelajaran}  // Menghubungkan dengan state Mata Pelajaran
            onChange={(e) => setMataPelajaran(e.target.value)}  // Menangani perubahan pada mata pelajaran
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',  // Warna latar belakang input
              },
            }}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            value={gender}  // Menghubungkan dengan state Gender
            onChange={(e) => setGender(e.target.value)}  // Menangani perubahan pada gender
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',  // Warna latar belakang input
              },
            }}
          />
          <TextField
            label="Jabatan"
            variant="outlined"
            fullWidth
            value={jabatan}  // Menghubungkan dengan state Jabatan
            onChange={(e) => setJabatan(e.target.value)}  // Menangani perubahan pada jabatan
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',  // Warna latar belakang input
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dashboard")} // Navigasi ke halaman dashboard
              sx={{ backgroundColor: "#F39C12" }}  // Warna tombol batal
            >
              Batal
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#2C3E50",  // Warna tombol simpan
                '&:hover': { backgroundColor: "#F39C12" },  // Warna saat hover
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
