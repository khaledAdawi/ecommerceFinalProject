import React, { useState } from "react";
import useCart from "../../hooks/useCart";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Stack, CircularProgress, FormControl, Select, MenuItem, InputLabel, } from "@mui/material";
import Swal from "sweetalert2";
import useCheckout from "../../hooks/useCheckout";

export default function CheckOut() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useCart();

    const cartItems = data?.items || [];
    const isEmpty = cartItems.length === 0;

    const { mutate: checkout, isPending: isCheckOut } = useCheckout();
    const [PaymentMethod, setPaymentMethod] = useState("");

    const handlePlaceOrder = () => {
        if (!PaymentMethod) {
            Swal.fire({
                icon: "warning",
                title: "Payment method required",
                text: "Please select a payment method to continue.",
            });
            return;
        }

        Swal.fire({
            title: "Confirm Payment",
            text: "Are you sure you want to place this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, place order",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                checkout(
                    { PaymentMethod },
                    {
                        onSuccess: () => {
                            Swal.fire({
                                icon: "success",
                                title: "Order placed successfully",
                                text: "Your order has been placed.",
                            });
                        },
                        onError: () => {
                            Swal.fire({
                                icon: "error",
                                title: "Payment failed",
                                text: "Something went wrong.",
                            });
                        },
                    }
                );
            }
        });
    };

    if (isLoading) return <CircularProgress sx={{ m: 4 }} />;
    if (isError) return <Typography>Error loading checkout</Typography>;

    return (
        <Box sx={{ py: 6 }}>
            <Container maxWidth="lg">

                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, letterSpacing: 1, mb: 4 }}>
                    {t("Your Order")}
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                        gap: 5,
                    }}>

                    <Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderBottom: "1px solid #eee",
                                pb: 1,
                                mb: 2,
                                fontWeight: 600,
                            }}>
                            <Typography>{t("Product")}</Typography>
                            <Typography>{t("Subtotal")}</Typography>
                        </Box>


                        {cartItems.map((item) => (
                            <Box
                                key={item.productId}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    py: 1.5,
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                            >
                                <Typography color="text.secondary">
                                    {item.productName} × {item.count}
                                </Typography>

                                <Typography>
                                    ${item.totalPrice?.toFixed(2)}
                                </Typography>
                            </Box>
                        ))}


                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                py: 2,
                                borderBottom: "1px solid #eee",
                                fontWeight: 600,
                            }}
                        >
                            <Typography>{t("Subtotal")}</Typography>
                            <Typography>${data.cartTotal}</Typography>
                        </Box>


                        <Box sx={{ py: 2 }}>
                            <Typography sx={{ mb: 1 }}>{t("Shipping")}</Typography>
                            <Stack spacing={1}>
                                <Typography variant="body2">
                                    ○ {t("Free shipping")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ○ {t("Local pickup")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ○ {t("Flat Rate")} $10
                                </Typography>
                            </Stack>
                        </Box>


                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                py: 2,
                                borderTop: "1px solid #eee",
                                fontWeight: 700,
                            }}
                        >
                            <Typography>{t("Total")}</Typography>
                            <Typography>${data.cartTotal}</Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            sx={{ mt: 2 }}
                            onClick={() => navigate("/cart")}
                        >
                            {t("Return To Cart")}
                        </Button>
                    </Box>


                    <Box>
                        <Typography sx={{ mb: 2, fontWeight: 600 }}>
                            {t("Payment Method")}
                        </Typography>

                        <FormControl fullWidth>
                            <InputLabel id="payment-method-label">{t("Select Payment Method")}</InputLabel>
                            <Select
                                labelId="payment-method-label"
                                value={PaymentMethod}
                                displayEmpty
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >

                                <MenuItem value="Cash">
                                    {t("Cash on Delivery")}
                                </MenuItem>
                                <MenuItem value="Visa">
                                    {t("Credit Card")}
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                border: "1px solid #eee",
                                fontSize: 14,
                                color: "text.secondary",
                            }}
                        >
                            {t(
                                "Your personal data will be used to process your order and support your experience."
                            )}
                        </Box>

                        <Button
                            fullWidth
                            disabled={isEmpty || !PaymentMethod || isCheckOut}
                            onClick={handlePlaceOrder}
                            sx={{
                                mt: 3,
                                py: 1.6,
                                backgroundColor: "#000",
                                color: "#fff",
                                borderRadius: 0,
                                "&:hover": { backgroundColor: "#222" },
                            }}
                        >
                            {isCheckOut ? t("Processing...") : t("Place Order")}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
