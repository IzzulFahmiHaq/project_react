import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

export default function Tambah() {
  const [namaMurid, setNamaMurid] = useState("");  
  const [kelas, setKelas] = useState("");  
  const [jurusan, setJurusan] = useState("");  
  const [asalsekolah, setAsalSekolah] = useState("");  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaMurid || !kelas || !jurusan || !asalsekolah) {
      Swal.fire("Gagal!", "Semua field wajib diisi!", "error");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3030/murids");
      const murids = response.data;
      const nomorUrut = murids.length + 1;

      const newMurid = {
        id: nomorUrut.toString(),
        no: nomorUrut,
        namaMurid,
        kelas: parseInt(kelas),
        jurusan,
        asalsekolah,
      };

      await axios.post("http://localhost:3030/murids", newMurid);

      Swal.fire("Berhasil!", "Murid berhasil ditambahkan.", "success");
      navigate("/datamurid");
    } catch (error) {
      console.error("Error adding murid:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat menambahkan murid.", "error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ECF0F1",
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
          backgroundColor: "#2C3E50",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "#F39C12",
            fontWeight: "bold",
          }}
        >
          Tambah Daftar Murid Baru
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
                backgroundColor: '#fff',
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
                backgroundColor: '#fff',
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
                backgroundColor: '#fff',
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
                backgroundColor: '#fff',
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/dashboard")}
              sx={{ backgroundColor: "#F39C12" }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#2C3E50",
                '&:hover': { backgroundColor: "#F39C12" },
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
