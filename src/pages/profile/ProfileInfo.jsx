import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUpdateProfileInfo from "../../hooks/useUpdateProfileInfo";
import useChangeEmail from "../../hooks/useChangeEmail";
import useChangePassword from "../../hooks/useChangePass";
import Swal from "sweetalert2";

import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    TextField,
    Button,
    Paper,
} from "@mui/material";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileInfo() {
    const { t } = useTranslation();

    const { data, isLoading, isError } = useProfile();
    const updateProfile = useUpdateProfileInfo();
    const changeEmail = useChangeEmail();
    const changePassword = useChangePassword();

    const [editBasic, setEditBasic] = useState(false);

    const [basicForm, setBasicForm] = useState({
        fullName: "",
        phoneNumber: "",
        city: "",
    });

    const [email, setEmail] = useState("");
    const [passwords, setPasswords] = useState({
        current: "",
        next: "",
        confirm: "",
    });

    useEffect(() => {
        if (data) {
            setBasicForm({
                fullName: data.fullName || "",
                phoneNumber: data.phoneNumber || "",
                city: data.city || "",
            });
        }
    }, [data]);

    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress />
            </Box>
        );

    if (isError)
        return (
            <Typography color="error.main">
                {t("Error loading profile")}
            </Typography>
        );

    /* ================= HANDLERS ================= */

    const handleSaveBasic = () => {
        if (!basicForm.fullName.trim()) {
            Swal.fire(t("Error"), t("Full name is required"), "error");
            return;
        }

        updateProfile.mutate(basicForm, {
            onSuccess: () => {
                Swal.fire(t("Success"), t("Profile updated successfully"), "success");
                setEditBasic(false);
            },
            onError: () => {
                Swal.fire(t("Error"), t("Failed to update profile"), "error");
            },
        });
    };

    const handleChangeEmail = () => {
        if (!email.trim()) {
            Swal.fire(t("Error"), t("Email is required"), "error");
            return;
        }

        changeEmail.mutate(
            { newEmail: email },
            {
                onSuccess: () => {
                    Swal.fire(t("Success"), t("Email updated successfully"), "success");
                    setEmail("");
                },
                onError: () => {
                    Swal.fire(t("Error"), t("Failed to update email"), "error");
                },
            }
        );
    };

    const handleChangePassword = () => {
        if (
            !passwords.current ||
            !passwords.next ||
            !passwords.confirm
        ) {
            Swal.fire(t("Error"), t("All fields are required"), "error");
            return;
        }

        if (passwords.next !== passwords.confirm) {
            Swal.fire(t("Error"), t("Passwords do not match"), "error");
            return;
        }

        changePassword.mutate(
            {
                CurrentPassword: passwords.current,
                NewPassword: passwords.next,
                ConfirmNewPassword: passwords.confirm,
            },
            {
                onSuccess: () => {
                    Swal.fire(t("Success"), t("Password changed"), "success");
                    setPasswords({ current: "", next: "", confirm: "" });
                },
                onError: () => {
                    Swal.fire(t("Error"), t("Failed to change password"), "error");
                },
            }
        );
    };


    return (
        <Box>
            <Typography variant="h5" fontWeight={800} mb={1}>
                {t("Profile Information")}
            </Typography>
            <Typography color="text.secondary" mb={4}>
                {t("Manage your personal information")}
            </Typography>

            
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography fontWeight={700} mb={3}>
                    {t("Basic Information")}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label={t("Full Name")}
                            value={basicForm.fullName}
                            disabled={!editBasic}
                            onChange={(e) =>
                                setBasicForm({ ...basicForm, fullName: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label={t("Phone Number")}
                            value={basicForm.phoneNumber}
                            disabled={!editBasic}
                            onChange={(e) =>
                                setBasicForm({ ...basicForm, phoneNumber: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label={t("City")}
                            value={basicForm.city}
                            disabled={!editBasic}
                            onChange={(e) =>
                                setBasicForm({ ...basicForm, city: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label={t("Email")}
                            value={data.email}
                            disabled
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    {editBasic ? (
                        <>
                            <Button variant="contained" onClick={handleSaveBasic}>
                                {t("Save")}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setEditBasic(false)}
                            >
                                {t("Cancel")}
                            </Button>
                        </>
                    ) : (
                        <Button variant="outlined" onClick={() => setEditBasic(true)}>
                            {t("Edit Information")}
                        </Button>
                    )}
                </Box>
            </Paper>

            
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography fontWeight={700} mb={2}>
                    {t("Change Email")}
                </Typography>

                <Box sx={{ maxWidth: 400 }}>
                    <TextField
                        fullWidth
                        label={t("New Email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        onClick={handleChangeEmail}
                    >
                        {t("Update Email")}
                    </Button>
                </Box>
            </Paper>

            
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
                <Typography fontWeight={700} mb={2}>
                    {t("Change Password")}
                </Typography>

                <Grid container spacing={2} maxWidth={400}>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            fullWidth
                            label={t("Current Password")}
                            value={passwords.current}
                            onChange={(e) =>
                                setPasswords({ ...passwords, current: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            fullWidth
                            label={t("New Password")}
                            value={passwords.next}
                            onChange={(e) =>
                                setPasswords({ ...passwords, next: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            fullWidth
                            label={t("Confirm Password")}
                            value={passwords.confirm}
                            onChange={(e) =>
                                setPasswords({ ...passwords, confirm: e.target.value })
                            }
                        />
                    </Grid>
                </Grid>

                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="error"
                    onClick={handleChangePassword}
                >
                    {t("Update Password")}
                </Button>
            </Paper>
        </Box>
    );
}
