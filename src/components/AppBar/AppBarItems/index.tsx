'use client'
import DesktopAppBarItems from "./DesktopAppBarItems";
import MobileAppBarItems from "./MobileAppBarItems";
import { useMediaQuery } from "@mui/material";

export default function AppBarItems() {
    const isTabletOrMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        isTabletOrMobile ? <MobileAppBarItems /> : <DesktopAppBarItems />
    );
}
