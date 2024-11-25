import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Navbar from './component/Navbar';

const Dashboard = () => {
  const navigate = useNavigate(); // Hook untuk menavigasi ke halaman lain

  const handleGoToDataGuru = () => {
    navigate("/dataguru");
  };

  const handleGoToDataMurid = () => {
    navigate("/datamurid");
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #2C3E50, #34495E)",
          padding: { xs: 2, sm: 4 }, // Padding for small screens and larger screens
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: "'Cinzel', serif",
            fontWeight: "700",
            color: "#F39C12",
            textAlign: "center",
            letterSpacing: 2,
            marginBottom: 4,
            textTransform: "uppercase",
            fontSize: { xs: "2rem", sm: "3rem" }, // Adjust font size for small screens
          }}
        >
          Welcome to Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: 4,
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
            width: "90%",
            maxWidth: 500,
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "100%", // Button takes full width
              padding: "16px 24px",
              background: "linear-gradient(135deg, #F39C12, #F1C40F)",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "700",
              letterSpacing: 1.2,
              fontSize: { xs: "1rem", sm: "1.2rem" }, // Adjust button text size for small screens
              textTransform: "none",
              borderRadius: "12px",
            }}
            onClick={handleGoToDataGuru}
            startIcon={<BusinessCenterIcon />}
          >
            Teacher Data
          </Button>

          <Button
            variant="contained"
            sx={{
              width: "100%", // Button takes full width
              padding: "16px 24px",
              background: "linear-gradient(135deg, #C0392B, #E74C3C)",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "700",
              letterSpacing: 1.2,
              fontSize: { xs: "1rem", sm: "1.2rem" }, // Adjust button text size for small screens
              textTransform: "none",
              borderRadius: "12px",
            }}
            onClick={handleGoToDataMurid}
            startIcon={<PeopleIcon />}
          >
            Student Data
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
