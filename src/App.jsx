import React from 'react'
import { RouterProvider } from "react-router/dom";
import router from './route.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LanguageManager from './utils/LanguageManager.js';
import getTheme from './theme.js';
import useThemeStore from './store/useThemeStore.js';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

export default function App() {
  const queryClient = new QueryClient()
    const mode = useThemeStore((state)=>state.mode);
    const theme = getTheme(mode);

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageManager />
            <ReactQueryDevtools initialIsOpen={false} />
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    )
}
