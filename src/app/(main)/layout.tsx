import AppBar from "@/components/AppBar";
import { Container, Stack } from "@mui/material";
import DesktopAppMenu from "@/components/AppMenu/DesktopAppMenu";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <Stack width="100vw" height="100vh" overflow="hidden" >
            <AppBar />
            <Stack direction="row" width="100%" height="100%">
                <DesktopAppMenu />
                <Container sx={{ overflow: 'auto' }}>
                    {children}
                </Container>
            </Stack>
        </Stack>
    );
}
