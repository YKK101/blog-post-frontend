import MenuItemList from "./MenuItemList";
import { Box, Stack } from '@mui/material';
import { DESKTOP_APP_MENU_WIDTH } from "@/constants/constants";

export default function DesktopAppMenu({ children, centerContent = false }: { children: React.ReactNode, centerContent?: boolean }) {
    return (
        <Stack direction="row" width="100%">
            <MenuItemList width={DESKTOP_APP_MENU_WIDTH} sx={{ display: { xs: 'none', md: 'block' } }} />
            {children}
            {centerContent && <Box width={DESKTOP_APP_MENU_WIDTH} sx={{ display: { xs: 'none', md: 'block' } }} />}
        </Stack>
    );
}