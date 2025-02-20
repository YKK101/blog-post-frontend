import { CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function LoadingFooter() {
    const t = useTranslations('');

    return (
        <Stack direction="row" alignItems="center" justifyContent="center" width="100%" spacing={2} py={2}>
            <CircularProgress size={20} />
            <Typography color="text.secondary">{t('common.loading')}</Typography>
        </Stack>
    );
}