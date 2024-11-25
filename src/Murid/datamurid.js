import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { styled } from '@mui/material/styles'; 
import Table from '@mui/material/Table'; 
import TableBody from '@mui/material/TableBody'; 
import TableCell, { tableCellClasses } from '@mui/material/TableCell'; 
import TableContainer from '@mui/material/TableContainer'; 
import TableHead from '@mui/material/TableHead'; 
import TableRow from '@mui/material/TableRow'; 
import Paper from '@mui/material/Paper'; 
import Navbar from '../component/Navbar'; 
import { useNavigate } from 'react-router-dom'; 
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; 
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"; 
import AddIcon from "@mui/icons-material/Add"; 
import Swal from 'sweetalert2'; 
import { Box, Button, Typography, TextField } from '@mui/material'; 

const tableHeaderBackground = '#BDC3C7'; 
const textColor = '#34495E'; 
const hoverBackground = '#D5DBDB'; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: tableHeaderBackground,
    color: '#2C3E50',
    fontWeight: 'bold',
    padding: '16px',
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#ECF0F1',
    fontSize: 14,
    padding: '16px',
    textAlign: 'center',
    color: textColor,
    '&:hover': {
      backgroundColor: hoverBackground,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F9F9F9',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DataMurid() {
  const [murids, setMurids] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:3030/murids')
      .then(response => {
        setMurids(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteMurid = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the murid item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3030/murids/${id}`)
          .then(() => {
            setMurids(murids.filter(murid => murid.id !== id)); 
            Swal.fire('Deleted!', 'Murid item has been deleted.', 'success');
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire('Failed!', 'Could not delete murid item.', 'error');
          });
      }
    });
  };

  // Filter data berdasarkan kata kunci pencarian
  const filteredMurids = murids.filter(murid => 
    murid.namaMurid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    murid.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    murid.jurusan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    murid.asalsekolah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            alignSelf: "center",
            fontWeight: "bold",
            color: textColor,
          }}
        >
          Daftar Murid
        </Typography>

        {/* Input Pencarian */}
        <TextField
          variant="outlined"
          placeholder="Cari Murid..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update state pencarian
          sx={{
            width: '300px', // Lebar input pencarian
            height: '50px', 
            '& .MuiOutlinedInput-root': {
              height: '100%',
            },
            '& .MuiInputBase-input': {
              padding: '12px', // Padding agar teks tidak terlalu rapat
              fontSize: '16px',
            },
          }}
        />

        {/* Tombol untuk menambah data murid */}
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #2C3E50, #34495E)',
            '&:hover': {
              background: 'linear-gradient(135deg, #F39C12, #F39C12)',
            },
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            padding: '12px 24px',
            fontSize: '16px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            transition: 'background 0.3s ease',
          }}
          onClick={() => navigate("/tambah")}
        >
          <AddIcon
            style={{
              fontSize: '28px',
              marginRight: '12px',
              color: '#fff',
            }}
          />
          Tambah
        </Button>
      </Box>

      {/* Menampilkan tabel data murid */}
      <TableContainer
        component={Paper}
        sx={{ marginLeft: '240px', width: 'calc(100% - 240px)', padding: 2 }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Nama Murid</StyledTableCell>
              <StyledTableCell>Kelas</StyledTableCell>
              <StyledTableCell>Jurusan</StyledTableCell>
              <StyledTableCell>Asal Sekolah</StyledTableCell>
              <StyledTableCell>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMurids.map((murid, index) => (
              <StyledTableRow key={murid.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{murid.namaMurid}</StyledTableCell>
                <StyledTableCell>{murid.kelas}</StyledTableCell>
                <StyledTableCell>{murid.jurusan}</StyledTableCell>
                <StyledTableCell>{murid.asalsekolah}</StyledTableCell>
                <StyledTableCell>
                  <EditOutlinedIcon
                    onClick={() => navigate(`/editmurid/${murid.id}`)}
                    style={{
                      color: "#F39C12",
                      cursor: "pointer",
                      fontSize: "24px",
                      marginRight: "16px",
                    }}
                  />
                  <DeleteOutlineIcon
                    onClick={() => deleteMurid(murid.id)}
                    style={{
                      color: "#E74C3C",
                      cursor: "pointer",
                      fontSize: "24px",
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
