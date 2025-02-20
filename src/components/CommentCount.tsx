import { COLOR } from "@/theme/color";
import { Grid2 as Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import CommentIcon from '@/assets/comment-icon.svg';

export default function CommentCount({ commentCount = 0 }: { commentCount?: number }) {
    const t = useTranslations('');

    if (commentCount === 0) return null;

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid size="auto">
                <CommentIcon stroke={COLOR.GREY_300} />
            </Grid>
            <Grid size="auto">
                <Typography color={COLOR.GREY_300}>{t('comment.comment', { count: commentCount })}</Typography>
            </Grid>
        </Grid>
    );
}