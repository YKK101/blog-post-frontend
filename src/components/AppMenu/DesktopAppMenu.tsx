'use client';
import MenuItemList from "./MenuItemList";
import { useMediaQuery } from '@mui/material';
import { lightTheme } from '@/theme/theme';

export default function DesktopAppMenu() {
    const isTabletOrMobile = useMediaQuery(lightTheme.breakpoints.down('md'));

    if (isTabletOrMobile) {
        return null;
    }

    return (
        <MenuItemList />
    );
}