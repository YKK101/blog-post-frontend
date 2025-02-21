import AppBar from "@/components/AppBar";
import { Stack } from "@mui/material";
import DesktopAppMenu from "@/components/AppMenu/DesktopAppMenu";
import { APPBAR_HEIGHT } from "@/constants/constants";

export default function PostLayout({ children }: { children: React.ReactNode }) {
    return (
        <Stack width="100vw" height="100vh" overflow="hidden" >
            <AppBar />
            <Stack direction="row" width="100%" height={`calc(100vh - ${APPBAR_HEIGHT}px)`}>
                <DesktopAppMenu>
                    {children}
                </DesktopAppMenu>
            </Stack>
        </Stack>
    );
}
