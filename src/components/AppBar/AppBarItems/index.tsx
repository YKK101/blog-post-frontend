import DesktopAppBarItems from "./DesktopAppBarItems";
import MobileAppBarItems from "./MobileAppBarItems";
import { Box } from "@mui/material";

export default function AppBarItems() {
    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <MobileAppBarItems />
            </Box >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <DesktopAppBarItems />
            </Box>
        </>
    );
}
