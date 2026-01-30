import { Box, Typography } from "@mui/material";
import heroImg from "../../assets/about/about-title.jpg";

export default function AboutHero() {
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
        ABOUT US
      </Typography>
    </Box>
  );
}
