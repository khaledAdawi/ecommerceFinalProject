import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useTranslation } from "react-i18next";
import LanguageIcon from '@mui/icons-material/Language';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import useThemeStore from "../../store/useThemeStore";
import { IconButton } from "@mui/material";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useThemeStore();

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
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", py: 2 }}>


        <Box sx={{ alignItems: "center", display: "flex", gap: 4 }}>
          {[{ "Home": t("Home") }, { "Shop": t("Shop") }, { "About": t("About") }, { "Contact": t("Contact") }].map((item) => {
            const key = Object.keys(item)[0];
            return (
              <Link key={key} component={RouterLink} to={key === "Home" ? "/" : `/${key.toLowerCase()}`} underline="none" color="inherit"
                sx={{ fontSize: 13, letterSpacing: 1, fontWeight: 500, "&:hover": { opacity: 0.6 } }}
              >
                {item[key]}
              </Link>
            )
          })}
        </Box>


        <Typography variant="h6"
          sx={{ fontWeight: 600, letterSpacing: 6, textAlign: "center" }}
        >
          KASHOP
        </Typography>


        <Box sx={{ alignItems: "center", display: "flex", gap: 4, justifyContent: "flex-end" }}>


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
          <IconButton onClick={toggleLanguage}>
                <LanguageIcon />
              </IconButton>

              <IconButton onClick={toggleTheme}>
                {mode === "light" ? <NightlightIcon /> : <WbSunnyIcon />}
              </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
