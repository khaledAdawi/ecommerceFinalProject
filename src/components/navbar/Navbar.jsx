import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleLanguage = () => {
    const lng = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(lng);
  }

  return (
    <AppBar position="static" elevation={0}
      sx={{ backgroundColor: "white", color: "black", borderBottom: "1px solid #eee" }}
    >
      <Toolbar sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", py: 2 }}>


        <Box sx={{ display: "flex", gap: 4 }}>
          {[{"Home": t("Home")}, {"Shop": t("Shop")}, {"About": t("About")}, {"Contact": t("Contact")}].map((item) => {
            const key = Object.keys(item)[0];
            return (
              <Link key={key} component={RouterLink} to={key === "Home" ? "/" : `/${key.toLowerCase()}`} underline="none" color="inherit"
                sx={{ fontSize: 13, letterSpacing: 1, fontWeight: 500, "&:hover": { opacity: 0.6 } }}
              >
                {item[key]}
              </Link>
          )})}
        </Box>


        <Typography variant="h6"
          sx={{ fontWeight: 600, letterSpacing: 6, textAlign: "center" }}
        >
          KASHOP
        </Typography>


        <Box sx={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>

          {token ? (
            <>
              <Link component={RouterLink} to="/cart" underline="none" color="inherit"
                sx={{ fontSize: 13, letterSpacing: 1, fontWeight: 500, "&:hover": { opacity: 0.6 } }}
              >
                {t("Cart")}
              </Link>

              <Typography
                sx={{ fontSize: 13, letterSpacing: 1, fontWeight: 500, color: "#555" }}
              >
                {t("Hello")} {user?.name}
              </Typography>

              <Typography onClick={handleLogout}
                sx={{ cursor: "pointer", fontSize: 13, letterSpacing: 1, fontWeight: 500, "&:hover": { opacity: 0.6 } }}
              >
                {t("Logout")}
              </Typography>

              <LanguageIcon onClick={toggleLanguage}
                sx={{ cursor: "pointer", fontSize: 20, marginTop: "4px", "&:hover": { opacity: 0.6 } }}
              />
            </>
          ) : (
            <>
              <Link component={RouterLink} to="/login" underline="none" color="inherit"
                sx={{ fontSize: 13, letterSpacing: 1, fontWeight: 500, "&:hover": { opacity: 0.6 } }}
              >
                {t("Login")}
              </Link>

              <Link component={RouterLink} to="/register" underline="none" color="inherit"
                sx={{ fontSize: 13, letterSpacing: 1, fontWeight: 500, "&:hover": { opacity: 0.6 } }}
              >
                {t("Register")}
              </Link>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}
