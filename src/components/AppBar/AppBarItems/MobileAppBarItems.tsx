'use client';
import { useState } from "react";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItemList from "@/components/AppMenu/MenuItemList";
import { debounce } from "lodash";
import { COLOR } from "@/theme/color";
import ArrowNextIcon from '@/assets/arrow-next-icon.svg';
import { useTranslations } from "next-intl";
import { removeUser } from "@/lib/slices/userSlices";
import { useAppDispatch } from "@/lib/hook";
import { MOBILE_APP_MENU_WIDTH } from "@/constants/constants";

export default function MobileAppBarItems() {
    const t = useTranslations('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch = useAppDispatch();

    const toggleDrawer = debounce(() => {
        setIsDrawerOpen(!isDrawerOpen);
    }, 300);

    const handleSignOut = () => {
        toggleDrawer();
        dispatch(removeUser());
    };

    return (
        <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer} >
                <>
                    <Box marginLeft={2} marginY={4} onClick={toggleDrawer}>
                        <ArrowNextIcon width={24} height={24} stroke={COLOR.WHITE} />
                    </Box>
                    <MenuItemList fontColor={COLOR.WHITE} onSelected={toggleDrawer} width={MOBILE_APP_MENU_WIDTH} />
                    <Button variant="outlined" onClick={handleSignOut} className="m-4">{t('auth.signOut')}</Button>
                </>
            </Drawer>
        </>
    );
}
