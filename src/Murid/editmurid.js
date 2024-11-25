import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function EditMurid() {
  const [namaMurid, setNamaMurid] = useState("");  // Nama murid
  const [kelas, setKelas] = useState("");  // Kelas murid
  const [jurusan, setJurusan] = useState("");  // Jurusan murid
  const [asalsekolah, setAsalSekolah] = useState("");  // AsalSekolah murid
  const navigate = useNavigate();
  const { id } = useParams(); // To get the student id from the URL

  // Fetch the murid data based on the id from the URL
  useEffect(() => {
    axios
      .get(`http://localhost:3030/murids/${id}`)
      .then((response) => {
        const murid = response.data;
        setNamaMurid(murid.namaMurid);
        setKelas(murid.kelas);
        setJurusan(murid.jurusan);
        setAsalSekolah(murid.asalsekolah);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        Swal.fire("Gagal!", "Tidak dapat mengambil data murid.", "error");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!namaMurid || !kelas || !jurusan || !asalsekolah) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      // Update data murid yang ada
      const updatedMurid = {
        namaMurid,
        kelas: parseInt(kelas),
        jurusan,
        asalsekolah,
      };

      await axios.put(`http://localhost:3030/murids/${id}`, updatedMurid); // Update data murid

      Swal.fire("Berhasil!", "Murid berhasil diperbarui.", "success");
      navigate("/datamurid"); // Navigasi ke halaman daftar murid
    } catch (error) {
      console.error("Error updating murid:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui data murid.", "error");
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
          Edit Data Murid
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama Murid"
            variant="outlined"
            fullWidth
            value={namaMurid}
            onChange={(e) => setNamaMurid(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input form
              },
            }}
          />
          <TextField
            label="Kelas"
            variant="outlined"
            fullWidth
            type="number"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input form
              },
            }}
          />
          <TextField
            label="Jurusan"
            variant="outlined"
            fullWidth
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff', // Warna latar belakang input form
              },
            }}
          />
          <TextField
            label="Asal Sekolah"
            variant="outlined"
            fullWidth
            value={asalsekolah}
            onChange={(e) => setAsalSekolah(e.target.value)}
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
              onClick={() => navigate("/Dashboard")}
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
