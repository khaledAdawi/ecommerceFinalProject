import { Box, Button, CircularProgress, Dialog, DialogContent, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SendCodeSchema } from "../../validations/SendCodeSchema";
import useSendCode from "../../hooks/useSendCode";
import { useTranslation } from "react-i18next";
export default function SendCode() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const { sendCodeMutation, serverErrors } = useSendCode();
    const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm({
        resolver: yupResolver(SendCodeSchema),
        mode: "onBlur",
    });
    const {t} = useTranslation();
    const sendCodeForm = async (values) => {
        await sendCodeMutation.mutateAsync(values);
    };
    const handleClose = (event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            setOpen(false);
            navigate("/login");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(sendCodeForm)}>
                    <Typography variant="h6" align="center" sx={{ mb: 1 }}>
                        {t("FORGOT PASSWORD")}
                    </Typography>

                    {serverErrors.length > 0 ? (
                        <Box sx={{ backgroundColor: "#fdecea", border: "1px solid #f5c6cb", borderRadius: 2, p: 2, mb: 2, }}>
                            {serverErrors.map((err, index) => (
                                <Typography key={index} variant="body2" sx={{ color: "#b71c1c" }}>
                                    {err}
                                </Typography>
                            ))}
                        </Box>
                    ) : null}

                    <Typography variant="body2" align="center" sx={{ mb: 3, color: "text.secondary" }}>
                        {t("Enter your email and we'll send you a verification code.")}
                    </Typography>

                    <TextField {...register('email')} fullWidth margin="dense" label={t("Email")} variant="outlined"
                        error={errors.email} helperText={errors.email?.message} />
                    <Button variant="contained" type="submit" disabled={isSubmitting} fullWidth sx={{ mt: 2, py: 1.2 }}>
                        {isSubmitting ? <CircularProgress /> : t("SEND CODE")}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
