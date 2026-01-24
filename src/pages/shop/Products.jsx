import { Box, Card, CardContent, CardMedia, Container, Grid, Typography, CircularProgress } from "@mui/material";
import { useProducts } from "../../hooks/useProducts";

export default function Products() {
    const { isLoading, isError, data } = useProducts();
    console.log(data);
    if (isLoading)
        return <Box sx={{ py: 10, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
            </Box>;

    if (isError)
        return <Typography align="center" sx={{ py: 10 }}>Failed to load products</Typography>;

    return (
        <Box sx={{ py: 6 }}>
            <Typography variant="h4" align="center"
                sx={{ fontWeight: 500, mb: 4, letterSpacing: 1 }}>
                Products
            </Typography>

            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {data.data?.map((product) => (
                        <Grid key={product.id} item size={{ xs: 12, sm: 6, md: 5, lg: 3 }}>

                            <Card sx={{
                                textAlign: "center", borderRadius: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                                transition: "all 0.3s ease", cursor: "pointer",
                                "&:hover": { transform: "translateY(-6px)", boxShadow: "0 12px 24px rgba(0,0,0,0.12)" },
                            }}>

                                <Box sx={{ overflow: "hidden" }}>
                                    <CardMedia component="img" height="260" image={product.image} alt={product.name}
                                        sx={{objectFit:"contain", transition: "0.4s ease" }}
                                    />
                                </Box>

                                <CardContent>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                                        {product.name}
                                    </Typography>

                                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                                        ${product.price}
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
