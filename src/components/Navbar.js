import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../context/AuthContext";

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: "white",
  fontWeight: 600,
  fontSize: "2rem",
}));

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={3} sx={{ backgroundColor: "#ff7043" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: 40, marginRight: 10, borderRadius: 5 }}
          />
          <Typography variant="h6" component="div">
            <StyledLink to="/">Recipe Book</StyledLink>
          </Typography>
        </Box>

        <Box>
          {user ? (
            <>
              <Button
                component={RouterLink}
                to="/favorites"
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                ❤️ Favorites
              </Button>
              <Button
                onClick={handleLogout}
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
