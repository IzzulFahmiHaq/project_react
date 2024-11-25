import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function EditGuru() {
  const [namaGuru, setNamaGuru] = useState(""); // Nama guru
  const [mataPelajaran, setMataPelajaran] = useState(""); // Mata Pelajaran
  const [gender, setGender] = useState(""); // Gender
  const [jabatan, setJabatan] = useState(""); // Jabatan
  const navigate = useNavigate();
  const { id } = useParams(); // To get the guru id from the URL

  // Fetch the guru data based on the id from the URL
  useEffect(() => {
    axios
      .get(`http://localhost:3030/Guru/${id}`)
      .then((response) => {
        const guru = response.data;
        setNamaGuru(guru.namaGuru);
        setMataPelajaran(guru.mataPelajaran);
        setGender(guru.gender);
        setJabatan(guru.jabatan);
      })
      .catch((error) => {
        console.error("Error fetching guru data:", error);
        Swal.fire("Gagal!", "Tidak dapat mengambil data guru.", "error");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!namaGuru || !mataPelajaran || !gender || !jabatan) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      // Update data guru yang ada
      const updatedGuru = {
        namaGuru,
        mataPelajaran,
        gender,
        jabatan,
      };

      await axios.put(`http://localhost:3030/Guru/${id}`, updatedGuru); // Update data guru

      Swal.fire("Berhasil!", "Guru berhasil diperbarui.", "success");
      navigate("/dataguru"); // Navigasi ke halaman daftar guru
    } catch (error) {
      console.error("Error updating guru:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui data guru.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ECF0F1", // Warna latar belakang yang lebih terang
        px: { xs: 2, sm: 0 }, // Padding responsif
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: { xs: "90%", sm: "400px" }, // Responsif width
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#2C3E50", // Warna latar belakang form
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "#F39C12", // Warna judul lebih terang
            fontWeight: "bold",
          }}
        >
          Edit Data Guru
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Guru"
            variant="outlined"
            fullWidth
            value={namaGuru}
            onChange={(e) => setNamaGuru(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input form
              },
            }}
          />
          <TextField
            label="Mata Pelajaran"
            variant="outlined"
            fullWidth
            value={mataPelajaran}
            onChange={(e) => setMataPelajaran(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input form
              },
            }}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input form
              },
            }}
          />
          <TextField
            label="Jabatan"
            variant="outlined"
            fullWidth
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input form
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dataguru")}
              sx={{ backgroundColor: "#F39C12" }} // Warna tombol batal
            >
              Batal
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#2C3E50", // Warna tombol simpan
                '&:hover': { backgroundColor: "#F39C12" }, // Warna saat hover
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
