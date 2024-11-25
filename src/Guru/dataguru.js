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
import { Box, Button, Typography } from '@mui/material';

// Styling for table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: '#BDC3C7',
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
    color: '#34495E',
    '&:hover': {
      backgroundColor: '#D5DBDB',
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

export default function DataGuru() {
  const [gurus, setGurus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3030/Guru')
      .then(response => {
        setGurus(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteGuru = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the guru item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3030/Guru/${id}`)
          .then(() => {
            setGurus(gurus.filter(guru => guru.id !== id));
            Swal.fire('Deleted!', 'Guru item has been deleted.', 'success');
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire('Failed!', 'Could not delete guru item.', 'error');
          });
      }
    });
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: '#34495E',
            marginBottom: { xs: '10px', sm: '0' }, // Space below on small screens
          }}
        >
          Daftar Guru
        </Typography>

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
          onClick={() => navigate("/tambahguru")}
        >
          <AddIcon
            style={{
              fontSize: '28px',
              marginRight: '12px',
              color: '#fff',
              transition: 'color 0.3s ease',
            }}
            sx={{
              '&:hover': {
                color: '#F39C12',
              },
            }}
          />
          Tambah
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          padding: 2,
          maxWidth: "100%",
          overflowX: "auto", // Make table scrollable on small screens
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Nama Guru</StyledTableCell>
              <StyledTableCell>Mata Pelajaran</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Jabatan</StyledTableCell>
              <StyledTableCell>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gurus.map((guru, index) => (
              <StyledTableRow key={guru.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{guru.namaGuru}</StyledTableCell>
                <StyledTableCell>{guru.mataPelajaran}</StyledTableCell>
                <StyledTableCell>{guru.gender}</StyledTableCell>
                <StyledTableCell>{guru.jabatan}</StyledTableCell>
                <StyledTableCell>
                  <EditOutlinedIcon
                    onClick={() => navigate(`/EditGuru/${guru.id}`)}
                    style={{
                      color: "#F39C12",
                      cursor: "pointer",
                      fontSize: "24px",
                      marginRight: "16px",
                    }}
                  />
                  <DeleteOutlineIcon
                    onClick={() => deleteGuru(guru.id)}
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
