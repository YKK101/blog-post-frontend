'use client';
import { Button, Grid2 as Grid, Paper, Stack, Typography } from "@mui/material";
import Modal from '@/components/Modal';
import { useTranslations } from "next-intl";

export interface IConfirmDialogProps {
    open: boolean;
    title: string;
    content?: string;
    confirmText?: string;
    confirmColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
    confirmVariant?: 'contained' | 'outlined' | 'text';
    cancelText?: string;
    cancelColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
    cancelVariant?: 'contained' | 'outlined' | 'text';
    onConfirm?: () => void;
    onCancel?: () => void;
    confirming?: boolean;
}

export default function ConfirmDialog(props: IConfirmDialogProps) {
    const t = useTranslations('');
    return (
        <Modal maxWidth={400} open={props.open}>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h6" textAlign="center">{props.title}</Typography>
                {props.content && <Typography textAlign="center">{props.content}</Typography>}
                <Grid container spacing={2} width="100%" sx={{ marginTop: 20 }}>
                    {props.onCancel && (
                        <Grid size="grow">
                            <Button
                                fullWidth
                                variant={props.cancelVariant || 'outlined'}
                                color={props.cancelColor || 'inherit'}
                                onClick={props.onCancel}
                            >
                                {props.cancelText || t('common.cancel')}
                            </Button>
                        </Grid>
                    )}
                    {props.onConfirm && (
                        <Grid size="grow">
                            <Button
                                fullWidth
                                variant={props.confirmVariant || 'contained'}
                                color={props.confirmColor || 'primary'}
                                onClick={props.onConfirm}
                                loading={props.confirming}
                            >
                                {props.confirmText || t('common.ok')}
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Stack>
        </Modal>
    )
}