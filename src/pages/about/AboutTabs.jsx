import { useState } from "react";
import { Box, Button, Typography, Grid, Stack, CardMedia } from "@mui/material";
import aboutSectionImg from "../../assets/about/aboutSection.jpg";

export default function AboutTabs() {
    const [active, setActive] = useState("about");

    return (
        <Box sx={{ px: "10%", py: 10 }}>
            <Grid sx={{
                    display: "flex",
                    gap: 6,
                }}>


                <Grid  size={{ xs: 12, md: 6 }}>
                    <CardMedia
                        component="img"
                        src={aboutSectionImg}
                        alt="About KAShop"
                        sx={{
                            objectFit: "contain",
                            
                        }}
                    />
                </Grid>


                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={3}>


                        <Stack direction="row" spacing={2}>
                            {["about", "services", "history"].map(tab => (
                                <Button
                                    key={tab}
                                    variant={active === tab ? "contained" : "outlined"}
                                    color="inherit"
                                    onClick={() => setActive(tab)}
                                    sx={{ fontSize: 13 }}
                                >
                                    {tab.toUpperCase()}
                                </Button>
                            ))}
                        </Stack>


                        {active === "about" && (
                            <Typography color="text.secondary">
                                Kashop is a modern eCommerce platform focused on simplicity,
                                quality products, and smooth user experience.
                            </Typography>
                        )}

                        {active === "services" && (
                            <Typography color="text.secondary">
                                We provide fast delivery, secure payments, and customer-first
                                support services.
                            </Typography>
                        )}

                        {active === "history" && (
                            <Typography color="text.secondary">
                                Founded in 2026, Kashop started as a university project and
                                evolved into a full eCommerce system.
                            </Typography>
                        )}

                        <Typography sx={{ cursor: "pointer", fontSize: 13 }}>
                            LEARN MORE →
                        </Typography>

                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
