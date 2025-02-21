import { Box, Paper, Modal as MuiModal, ModalProps } from "@mui/material";

export default function Modal({ maxWidth = 'md', open = true, ...props }: { maxWidth?: string | number, } & ModalProps) {
    return (
        <MuiModal
            open={open}
        >
            <Box width={'100vw'} height={'100vh'} display={'flex'}>
                <Paper sx={{ width: '80%', maxWidth: maxWidth, p: 4, m: 'auto' }}>
                    {props.children}
                </Paper>
            </Box>
        </MuiModal>
    )
}