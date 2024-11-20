import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete"; // Import icon for delete
import EditIcon from "@mui/icons-material/Edit"; // Import icon for edit
import Button from "@mui/material/Button"; // Import Button for 'Tambah' button
import Typography from "@mui/material/Typography"; // Import Typography for text
import Box from "@mui/material/Box"; // Import Box for layout
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Styling for table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Styling for table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Dashboard() {
  const [foods, setFoods] = useState([]); // State to store foods data
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch data from the server
  useEffect(() => {
    axios
      .get("http://localhost:3030/foods")
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Delete food item by ID
  const deleteFood = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the food item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/foods/${id}`)
          .then(() => {
            setFoods(foods.filter((food) => food.id !== id)); // Remove from state
            Swal.fire("Deleted!", "Food item has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Failed!", "Could not delete food item.", "error");
          });
      }
    });
  };

  return (
    <>
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
          Daftar Minuman
        </Typography>

        {/* Right side: Tambah Minuman button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/tambah")} // Navigate to /tambah page
        >
          Tamba
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="right">Minuman</StyledTableCell>
              <StyledTableCell align="right">Harga</StyledTableCell>
              <StyledTableCell align="right">Asal</StyledTableCell>
              <StyledTableCell align="right">Aksi</StyledTableCell>{" "}
              {/* Action column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food) => (
              <StyledTableRow key={food.id}>
                <StyledTableCell component="th" scope="row">
                  {food.no}
                </StyledTableCell>
                <StyledTableCell align="right">{food.minuman}</StyledTableCell>
                <StyledTableCell align="right">{food.harga}</StyledTableCell>
                <StyledTableCell align="right">{food.asal}</StyledTableCell>
                <StyledTableCell align="right">
                  {/* Edit icon */}
                  <EditIcon
                    onClick={() => navigate(`/EditMinuman/${food.id}`)} // Ensure correct route with ID
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      fontSize: "24px",
                      marginRight: "16px",
                    }}
                  />

                  {/* Delete icon */}
                  <DeleteIcon
                    onClick={() => deleteFood(food.id)}
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
