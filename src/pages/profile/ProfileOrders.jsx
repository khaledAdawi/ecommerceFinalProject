import React from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Typography,
    CircularProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Paper,
} from "@mui/material";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileOrders() {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useProfile();

    if (isLoading) return <CircularProgress />;
    if (isError)
        return <Typography color="error">{t("Error loading orders")}</Typography>;

    const orders = data.orders || [];

    if (!orders.length)
        return (
            <Box textAlign="center" py={6}>
                <Typography fontWeight={700}>{t("No orders yet")}</Typography>
                <Typography color="text.secondary">
                    {t("You haven't placed any orders yet")}
                </Typography>
            </Box>
        );

    return (
        <>
            <Typography variant="h5" fontWeight={800} mb={3}>
                {t("My Orders")}
            </Typography>

            <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>{t("Date")}</TableCell>
                            <TableCell>{t("Amount")}</TableCell>
                            <TableCell>{t("Payment")}</TableCell>
                            <TableCell>{t("Status")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.map((o) => (
                            <TableRow key={o.id} hover>
                                <TableCell>{o.id}</TableCell>
                                <TableCell>
                                    {new Date(o.orderDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>${o.amountPaid}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={o.paymentStatus}
                                        color={o.paymentStatus === "paid" ? "success" : "warning"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip label={o.status} size="small" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
}
