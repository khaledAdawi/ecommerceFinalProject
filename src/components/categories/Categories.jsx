
import { Box, Card, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';

export default function Categories() {
    const { isLoading, isError, data } = useCategories();
    console.log(data);
    if (isLoading) return <CircularProgress />
    if (isError) return <Typography>error</Typography>
    return (
        <>
            <Box sx={{ py: 6 }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 500, mb: 4, letterSpacing: 1 }}>
                    Categories
                </Typography>

                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        {data.map((category) => (
                            <Grid key={category.id} item size={{ xs: 12, sm: 6, md: 5, lg: 3 }} >
                                <Card sx={{
                                    textAlign: "center",
                                    py: 5,
                                    borderRadius: 2,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
                                    },
                                }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                        {category.name}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
