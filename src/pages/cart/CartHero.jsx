import React from 'react'
import CartImg from "../../assets/about/cart.jpg";
import { Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
export default function CartHero() {
    const { t} = useTranslation();
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
                    {t("Your Cart")}
                </Typography>
            </Box>
        </>
    )
}
