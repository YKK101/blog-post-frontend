'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from '@/theme/theme';
import { ReactNode } from 'react';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}