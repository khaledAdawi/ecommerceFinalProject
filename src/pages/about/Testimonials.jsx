import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function Testimonials() {
    const { t} = useTranslation();
    return (
        <Box sx={{ textAlign: "center", py: 12, px: "20%" }}>
            <Typography variant="h6" sx={{ letterSpacing: 3, mb: 4 }}>
                {t("What Our Customers Say")}
            </Typography>

            <Typography color="text.secondary">
                “{t("The design is clean, the experience is smooth, and everything feels professional.")}”
            </Typography>
        </Box>
    );
}
