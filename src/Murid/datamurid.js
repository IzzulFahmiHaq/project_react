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

// New color for text to differentiate from navbar
const tableHeaderBackground = '#BDC3C7'; // Light gray for header background
const textColor = '#34495E'; // Darker text color for visibility
const hoverBackground = '#D5DBDB'; // Lighter gray hover effect

// Styling for table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: tableHeaderBackground, // Adjusted to light gray
    color: '#2C3E50', // Dark text for better contrast in the header
    fontWeight: 'bold',
    padding: '16px',
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: '#ECF0F1', // Light gray background for body rows
    fontSize: 14,
    padding: '16px',
    textAlign: 'center',
    color: textColor, // Dark text color for contrast with the light background
    '&:hover': {
      backgroundColor: hoverBackground, // Soft hover effect for readability
    },
  },
}));

// Styling for table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F9F9F9', // Alternating row color for visual separation
  },
  '&:last-child td, &:last-child th': {
    border: 0, // No border on the last row
  },
}));

export default function DataMurid() {
  const [murids, setMurids] = useState([]);
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
            setMurids(murids.filter(murid => murid.id !== id)); // Remove from state
            Swal.fire('Deleted!', 'Murid item has been deleted.', 'success');
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' }, // Stack items vertically on small screens
          justifyContent: "space-between",
          marginBottom: "20px",
          px: 2, // Padding for smaller screens
        }}
      >
        <Typography
          variant="h4"
          sx={{
            alignSelf: "center",
            fontWeight: "bold",
            color: textColor, // Darker text color to match table and navbar contrast
            fontSize: { xs: '1.5rem', sm: '2rem' }, // Adjust font size for smaller screens
            textAlign: { xs: 'center', sm: 'left' }, // Center-align text on small screens
            mb: { xs: 2, sm: 0 } // Margin bottom for small screens
          }}
        >
          Daftar Murid
        </Typography>

        {/* "Tambah" button with yellow hover effect */}
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #2C3E50, #34495E)', // Gradient matching the navbar colors
            '&:hover': {
              background: 'linear-gradient(135deg, #F39C12, #F39C12)', // Yellow hover effect
            },
            color: '#fff',
            display: 'flex', // Ensure the icon and text are aligned
            alignItems: 'center',
            padding: '12px 24px', // Larger padding for a bigger button
            fontSize: '16px', // Larger font size for better readability
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Add a shadow to make it pop
            transition: 'background 0.3s ease', // Smooth background transition
          }}
          onClick={() => navigate("/tambah")}
        >
          <AddIcon
            style={{
              fontSize: '28px',
              marginRight: '12px',
              color: '#fff', // Default icon color is white
              transition: 'color 0.3s ease',
            }}
            sx={{
              '&:hover': {
                color: '#F39C12', // Yellow color when button is hovered
              },
            }}
          />
          Tambah
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: { xs: '100%', sm: 'calc(100% - 240px)' }, // Full width on small screens, with margin for larger screens
          padding: 2,
          overflowX: 'auto', // Enable horizontal scrolling on smaller screens
        }}
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
            {murids.map((murid, index) => (
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
                      color: "#F39C12", // Gold color for edit icon
                      cursor: "pointer",
                      fontSize: "24px",
                      marginRight: "16px",
                    }}
                  />
                  <DeleteOutlineIcon
                    onClick={() => deleteMurid(murid.id)}
                    style={{
                      color: "#E74C3C", // Red color for delete icon
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
