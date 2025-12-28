import { Box, Container, Grid, Typography, Button, Rating } from "@mui/material";

export default function ProductDetails() {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={6}>


                    <Grid item md={1} sx={{ display: { xs: "none", md: "block" } }}>
                        {[1, 2, 3, 4].map((i) => (
                            <Box
                                key={i}
                                component="img"
                                sx={{
                                    mb: 2,
                                    cursor: "pointer",
                                    border: "1px solid #eee",
                                }}
                            />
                        ))}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            alt="product"
                            sx={{
                                width: "100%",
                                backgroundColor: "#f7f7f7",
                            }}
                        />
                    </Grid>


                    <Grid item xs={12} md={5}>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                            White Clock
                        </Typography>

                        <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
                            $90
                        </Typography>

                        <Rating value={4} readOnly sx={{ mb: 2 }} />

                        <Typography
                            variant="body2"
                            sx={{ mb: 4, color: "text.secondary" }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum ut placerat nulla.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#000",
                                color: "#fff",
                                px: 5,
                                py: 1.5,
                                "&:hover": { backgroundColor: "#222" },
                            }}
                        >
                            ADD TO CART
                        </Button>

                        <Typography
                            variant="body2"
                            sx={{ mt: 4, color: "text.secondary" }}
                        >
                            SKU: 043 <br />
                            Category: Demo Products <br />
                            Tags: Gadgets, Minimalistic
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
}
