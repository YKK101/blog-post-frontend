'use client';
import { getPostBySlugApi } from "@/api/apiRoute";
import CommentList from "@/components/CommentList";
import { POST_DETAIL_REPLY_PATH } from "@/constants/routes";
import { Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Comments() {
    const t = useTranslations('');
    const { slug } = useParams();
    const router = useRouter();

    const { data: post } = useSWR(slug, () => getPostBySlugApi(slug as string));

    const handleAddComment = () => {
        router.replace(POST_DETAIL_REPLY_PATH(slug as string));
    }

    return (
        <Stack spacing={4}>
            <Button variant="outlined" onClick={handleAddComment} sx={{ width: 200 }}>{t('comment.addComment')}</Button>
            <CommentList postId={post?.documentId as string} />
        </Stack>
    );
}