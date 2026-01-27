import { Box, Grid, Typography, Button, Rating, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import useProductDetails from "../../hooks/useProductDetails";

export default function ProductDetails() {

    const { id } = useParams();
    const { data, isLoading, isError } = useProductDetails(id);
    console.log(data);

    if (isLoading)
        return <Box sx={{ py: 10, display: "flex", justifyContent: "center" }}><CircularProgress /></Box>;

    if (isError)
        return <Typography align="center" sx={{ py: 10 }}>Failed to load product</Typography>;

    if (!data)
        return <Typography align="center" sx={{ py: 10 }}>Product not found</Typography>;

    return (
        <Box sx={{ py: 8 }}>
            <Grid container spacing={6}>

                
                <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 5 }}>
                    <Box
                        component="img"
                        src={data.image}
                        alt={data.name}
                        sx={{ width: "100%", backgroundColor: "#f7f7f7", borderRadius: 2 }}
                    />

                    
                </Grid>

                
                <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 7 }}>

                    <Typography variant="h4" sx={{ mb: 1 }}>
                        {data.name}
                    </Typography>

                    <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
                        ${data.price}
                    </Typography>

                    <Rating value={data.rate} readOnly sx={{ mb: 2 }} />

                    <Typography sx={{ mb: 4, color: "text.secondary", lineHeight: 1.7 }}>
                        {data.description}
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#000", color: "#fff", px: 5, py: 1.5, "&:hover": { backgroundColor: "#222" } }}
                    >
                        ADD TO CART
                    </Button>

                    
                    {data.reviews?.length > 0 && (
                        <Box sx={{ mt: 5 }}>

                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Reviews
                            </Typography>

                            {data.reviews.map((review, index) => (
                                <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: "1px solid #eee" }}>

                                    <Typography sx={{ fontWeight: 500 }}>
                                        {review.userName}
                                    </Typography>

                                    <Rating value={review.rating} readOnly size="small" />

                                    <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                                        {review.comment}
                                    </Typography>

                                </Box>
                            ))}

                        </Box>
                    )}

                </Grid>

            </Grid>
        </Box>
    );
}
