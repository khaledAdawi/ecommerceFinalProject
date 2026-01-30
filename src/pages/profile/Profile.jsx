import React from "react";
import { useTranslation } from "react-i18next";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
    Stack,
    Avatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useTheme } from "@mui/material/styles";
import { useProfile } from "../../hooks/useProfile";

export default function Profile() {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useProfile();
    const theme = useTheme();

    if (isLoading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress />
            </Box>
        );

    if (isError)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <Typography color="error.main">
                    {t("Error loading profile")}
                </Typography>
            </Box>
        );

    const menuItems = [
        { label: t("Profile Info"), path: "", icon: <PersonIcon /> },
        { label: t("My Orders"), path: "orders", icon: <ShoppingBagIcon /> },
    ];

    return (
        <>
            
            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "sticky",
                    top: 64,
                    zIndex: 10,
                    bgcolor: "background.paper",
                    borderBottom: 1,
                    borderColor: "divider",
                }}
            >
                <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                    {menuItems.map((item) => (
                        <Button
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            end={item.path === ""}
                            startIcon={item.icon}
                            sx={{
                                textTransform: "none",
                                fontWeight: 600,
                                "&.active": {
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Stack>
            </Box>

            
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                
                <Box
                    sx={{
                        width: 280,
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        position: "fixed",
                        top: 64,
                        left: 0,
                        height: "calc(100vh - 64px)",
                        borderRight: 1,
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    
                    <Box
                        sx={{
                            p: 3,
                            textAlign: "center",
                            bgcolor:
                                theme.palette.mode === "light"
                                    ? "primary.main"
                                    : "rgba(68,91,143,0.15)",
                        }}
                    >
                        <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}>
                            {data.fullName?.[0]?.toUpperCase()}
                        </Avatar>
                        <Typography fontWeight={700} color="#fff">
                            {data.fullName}
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,.85)">
                            {data.email}
                        </Typography>
                    </Box>

                    
                    <List sx={{ p: 2 }}>
                        {menuItems.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    end={item.path === ""}
                                    sx={{
                                        borderRadius: 2,
                                        "&.active": {
                                            bgcolor: "primary.main",
                                            color: "#fff",
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: "inherit" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                
                <Box sx={{ flex: 1, ml: { md: "280px" } }}>
                    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
                        <Box
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                border: 1,
                                borderColor: "divider",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
