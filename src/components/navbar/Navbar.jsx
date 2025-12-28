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
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          py: 2,
        }}
      >

        <Box sx={{ display: "flex", gap: 4 }}>
          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link key={item} component={RouterLink} to={item === "Home" ? "/" : `/${item.toLowerCase()}`} underline="none" color="inherit"
              sx={{
                fontSize: 13,
                letterSpacing: 1,
                fontWeight: 500,
                "&:hover": { opacity: 0.6 },
              }}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 600, letterSpacing: 6, textAlign: "center",}}>
          KASHOP
        </Typography>

        
        <Box sx={{ display: "flex", gap: 4, justifyContent: "flex-end",}}>
          {["Cart", "Login", "Register"].map((item) => (
            <Link
              key={item}
              component={RouterLink}
              to={`/${item.toLowerCase()}`}
              underline="none"
              color="inherit"
              sx={{
                fontSize: 13,
                letterSpacing: 1,
                fontWeight: 500,
                "&:hover": { opacity: 0.6 },
              }}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
