import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        
        <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 3 }}>KASHOP</Typography>

        
        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Link component={RouterLink} to="/" underline="none" color="inherit"
            sx={{ fontSize: 15, "&:hover": { color: "#555" } }}>
            Home
          </Link>

          <Link component={RouterLink} to="/shop" underline="none" color="inherit"
            sx={{ fontSize: 15, "&:hover": { color: "#555" } }}>
            Shop
          </Link>

          <Link component={RouterLink} to="/about" underline="none" color="inherit"
            sx={{ fontSize: 15, "&:hover": { color: "#555" } }}>
            About
          </Link>

          <Link component={RouterLink} to="/contact" underline="none" color="inherit"
            sx={{ fontSize: 15, "&:hover": { color: "#555" } }}>
            Contact
          </Link>

          <Link component={RouterLink} to="/cart" underline="none" color="inherit"
            sx={{ fontSize: 15, "&:hover": { color: "#555" } }}>
            Cart
          </Link>

          <Link component={RouterLink} to="/login" underline="none" color="inherit"
            sx={{ fontSize: 15, "&:hover": { color: "#555" } }}>
            Login
          </Link>

          <Link component={RouterLink} to="/register" underline="none" color="inherit"
            sx={{ fontSize: 15, "&:hover": { color: "#555" } }}>
            Register
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
