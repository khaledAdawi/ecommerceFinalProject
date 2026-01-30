import { createTheme } from "@mui/material";

const getTheme = (mode) => {
    const isDark = mode === "dark";

    return createTheme({
        palette: {
            mode,

            primary: {
                main: "#000000",
            },

            secondary: {
                main: "#888888",
            },

            background: {
                default: isDark ? "#0b0b0b" : "#ffffff",
                paper: isDark ? "#121212" : "#ffffff",
            },

            text: {
                primary: isDark ? "#ffffff" : "#000000",
                secondary: isDark ? "#aaaaaa" : "#555555",
            },

            divider: isDark ? "#2a2a2a" : "#eeeeee",

            error: {
                main: "#e53935",
            },

            success: {
                main: "#2e7d32",
            },
        },

        shape: {
            borderRadius: 6,
        },

        typography: {
            fontFamily: `"Inter", "Helvetica", "Arial", sans-serif`,

            h4: {
                fontWeight: 600,
                letterSpacing: 1,
            },

            h5: {
                fontWeight: 600,
            },

            h6: {
                fontWeight: 500,
                letterSpacing: 0.5,
            },

            button: {
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
            },
        },

        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                        padding: "10px 28px",
                    },
                    containedPrimary: {
                        backgroundColor: "#000",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: "#222",
                        },
                    },
                    outlinedPrimary: {
                        borderColor: "#000",
                        color: "#000",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                        },
                    },
                },
            },

            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        borderRadius: 0,
                    },
                },
            },

            MuiCard: {
                styleOverrides: {
                    root: {
                        border: isDark ? "1px solid #2a2a2a" : "1px solid #eee",
                        borderRadius: 0,
                    },
                },
            },

            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: isDark ? "#2a2a2a" : "#eeeeee",
                    },
                },
            },

            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDark ? "#000" : "#fff",
                        color: isDark ? "#fff" : "#000",
                        boxShadow: "none",
                        borderBottom: isDark
                            ? "1px solid #2a2a2a"
                            : "1px solid #eee",
                    },
                },
            },
        },
    });
};

export default getTheme;
