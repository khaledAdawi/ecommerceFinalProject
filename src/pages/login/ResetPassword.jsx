import { Box, Button, CircularProgress, Dialog, DialogContent, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordSchema } from "../../validations/ResetPasswordSchema";
import useResetPassword from "../../hooks/useResetPassword";
import { useTranslation } from "react-i18next";
export default function ResetPassword() {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail");
    const { resetPasswordMutation, serverErrors } = useResetPassword();
    const { register, handleSubmit, formState: { errors, isSubmitting },} = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        mode: "onBlur",
    });
    const {t} = useTranslation();
    const resetPasswordForm = async (values) => {
        await resetPasswordMutation.mutateAsync({
            email,
            code: values.code,
            newPassword: values.newPassword,
        });
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
                <Box component="form" onSubmit={handleSubmit(resetPasswordForm)}>
                    <Typography variant="h6" align="center" sx={{ mb: 1 }}>
                        {t("RESET PASSWORD")}
                    </Typography>

                    <Typography variant="body2" align="center" sx={{ mb: 3, color: "text.secondary" }}>
                        {t("Enter the code sent to your email and set a new password.")}
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

                    <TextField {...register("code")} fullWidth margin="dense" label={t("Verification Code")} variant="outlined"
                        error={errors.code} helperText={errors.code?.message}
                    />

                    <TextField {...register("newPassword")} fullWidth margin="dense" type="password" label={t("New Password")} variant="outlined"
                        error={errors.newPassword} helperText={errors.newPassword?.message}
                    />

                    <Button variant="contained" disabled={isSubmitting} type="submit" fullWidth sx={{ mt: 2, py: 1.2 }}>
                        {isSubmitting ? <CircularProgress /> : t("RESET PASSWORD")}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
