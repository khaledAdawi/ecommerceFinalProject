import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

const fakeProducts = [
    { id: 1, name: "Virtual Product", price: "$350"},
    { id: 2, name: "External Product", price: "$250"},
    {id: 3,name: "White Clock",price: "$90"},
    { id: 4,name: "Anthracite Clock",price: "$90"},
];


export default function Products() {
    return (
        <Box sx={{ py: 8 }}>
            <Container maxWidth="lg">

                <Typography align="center" variant="subtitle2" sx={{ letterSpacing: 2, color: "text.secondary", mb: 4, }}>
                    PRODUCTS
                </Typography>

                <Grid container spacing={4}>
                    {fakeProducts.map((product) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 5, lg: 3 }} key={product.id}>
                            <Card
                                elevation={0}
                                sx={{
                                    cursor: "pointer",
                                    "&:hover img": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <Box sx={{ overflow: "hidden" }}>
                                    <CardMedia
                                        component="img"
                                        height="260"
                                        image={product.image}
                                        alt={product.name}
                                        sx={{ transition: "0.4s ease" }}
                                    />

                                </Box>

                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                                        {product.name}
                                    </Typography>

                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        {product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    );
}
