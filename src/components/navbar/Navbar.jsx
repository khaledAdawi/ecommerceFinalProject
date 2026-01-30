import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import useThemeStore from "../../store/useThemeStore";
import { IconButton, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

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
  };

  const navLinkStyle = {
    fontSize: 13,
    letterSpacing: 1,
    fontWeight: 500,
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -4,
      width: "0%",
      height: "1px",
      backgroundColor: "text.primary",
      transition: "0.3s",
    },
    "&:hover::after": {
      width: "100%",
    },
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          minHeight: 72,
        }}
      >
        
        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          {["Home", "Shop", "About", "Contact"].map((key) => (
            <Link
              key={key}
              component={RouterLink}
              to={key === "Home" ? "/" : `/${key.toLowerCase()}`}
              underline="none"
              color="inherit"
              sx={navLinkStyle}
            >
              {t(key)}
            </Link>
          ))}
        </Box>

        
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 6,
            textAlign: "center",
            userSelect: "none",
          }}
        >
          KASHOP
        </Typography>

        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          {token ? (
            <>
              <Link
                component={RouterLink}
                to="/cart"
                underline="none"
                color="inherit"
                sx={navLinkStyle}
              >
                {t("Cart")}
              </Link>

              <Divider orientation="vertical" flexItem />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  component={RouterLink}
                  to="/profile"
                  sx={{ p: 0, color: "inherit" }}
                >
                  <PersonIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  {user?.name}
                </Typography>
              </Box>

              <Typography
                onClick={handleLogout}
                sx={{
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  "&:hover": { opacity: 0.6 },
                }}
              >
                {t("Logout")}
              </Typography>
            </>
          ) : (
            <>
              <Link
                component={RouterLink}
                to="/login"
                underline="none"
                color="inherit"
                sx={navLinkStyle}
              >
                {t("Login")}
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                underline="none"
                color="inherit"
                sx={navLinkStyle}
              >
                {t("Register")}
              </Link>
            </>
          )}

          <Divider orientation="vertical" flexItem />

          <IconButton onClick={toggleLanguage} size="small">
            <LanguageIcon fontSize="small" />
          </IconButton>

          <IconButton onClick={toggleTheme} size="small">
            {mode === "light" ? (
              <NightlightIcon fontSize="small" />
            ) : (
              <WbSunnyIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
