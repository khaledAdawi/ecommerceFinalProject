import { Box, Typography } from "@mui/material";
import heroImg from "../../assets/about/about-title.jpg";
import { useTranslation } from "react-i18next";
export default function AboutHero() {
  const { t} = useTranslation();
  return (
    <Box
      sx={{
        height: 280,
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "white", letterSpacing: 4 }}
      >
        {t("About Us")}
      </Typography>
    </Box>
  );
}
