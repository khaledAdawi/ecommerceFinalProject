import React from 'react'
import CartImg from "../../assets/about/cart.jpg";
import { Box, Typography } from '@mui/material';
export default function CartHero() {
    return (
        <>
            
            <Box
                sx={{
                    height: 280,
                    backgroundImage: `url(${CartImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h3" sx={{ color: "#fff", letterSpacing: 4 }}>
                    CART
                </Typography>
            </Box>
        </>
    )
}
