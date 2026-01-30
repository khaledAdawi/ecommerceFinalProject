import { Box, Typography } from "@mui/material";

export default function Testimonials() {
    return (
        <Box sx={{ textAlign: "center", py: 12, px: "20%" }}>
            <Typography variant="h6" sx={{ letterSpacing: 3, mb: 4 }}>
                WHAT THEY’RE SAYING
            </Typography>

            <Typography color="text.secondary">
                “The design is clean, the experience is smooth,
                and everything feels professional.”
            </Typography>
        </Box>
    );
}
