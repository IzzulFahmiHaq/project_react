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
import Navbar from './component/navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DeleteIcon from "@mui/icons-material/Delete"; // Import icon for delete
import EditIcon from "@mui/icons-material/Edit"; // Import icon for edit
import Swal from 'sweetalert2';
import { Box, Button, Typography } from '@mui/material';

// Styling untuk cell tabel
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styling untuk row tabel
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Menghilangkan border di baris terakhir
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Dashboard() {
  const [murids, setMurids] = useState([]); // State to store murids data
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch data from the server
  useEffect(() => {
    axios.get('http://localhost:3030/murids')
      .then(response => {
        setMurids(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Delete murid item by ID
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
            setMurids(murids.filter(murid => murid.id !== id)); // Remove from state
            Swal.fire('Deleted!', 'murid item has been deleted.', 'success');
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire('Failed!', 'Could not delete murid item.', 'error');
          });
      }
    });
  };
  return (
    <>
      <Navbar />
           {/* Box container for the button and text */}
           <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {/* Left side: Daftar Minuman text */}
        <Typography
          variant="h4"
          sx={{ alignSelf: "center", fontWeight: "bold" }}
        >
          Daftar Murid
        </Typography>

        {/* Right side: Tambah Minuman button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/tambah")} // Navigate to /tambah page
        >
          Tambah
        </Button>
      </Box>
      <TableContainer 
        component={Paper} 
        sx={{ marginLeft: '240px', width: 'calc(100% - 240px)', padding: 2 }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="right">Nama Murid</StyledTableCell>
              <StyledTableCell align="right">Kelas</StyledTableCell>
              <StyledTableCell align="right">Jurusan</StyledTableCell>
              <StyledTableCell align="right">Asal Sekolah</StyledTableCell>
              <StyledTableCell align="right">Asal</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {murids.map((murid) => (
              <StyledTableRow key={murid.id}>
                <StyledTableCell component="th" scope="row">
                  {murid.no}
                </StyledTableCell>
                <StyledTableCell align="right">{murid.namaMurid}</StyledTableCell>
                <StyledTableCell align="right">{murid.Kelas}</StyledTableCell>
                <StyledTableCell align="right">{murid.Jurusan}</StyledTableCell>
                <StyledTableCell align="right">{murid.AsalSekolah}</StyledTableCell>
                <StyledTableCell align="right">
                  {/* Edit icon */}
                  <EditIcon
                    onClick={() => navigate(`/EditMinuman/${murid.id}`)} // Ensure correct route with ID
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      fontSize: "24px",
                      marginRight: "16px",
                    }}
                  />

                  {/* Delete icon */}
                  <DeleteIcon
                    onClick={() => deleteMurid(murid.id)}
                    style={{
                      color: "#d33",
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
