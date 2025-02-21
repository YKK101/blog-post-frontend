'use client';
import { Stack } from "@mui/material";
import CommentEditor, { ICommentEditorForm } from "@/components/CommentEditor";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { POST_DETAIL_PATH } from "@/constants/routes";
import useSWRMutation from "swr/mutation";
import { getPostBySlugApi, replyPostApi } from "@/api/apiRoute";
import { ICreateComment } from "@/types/post";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import CommentList from "@/components/CommentList";
import useSWR from "swr";

export default function Reply() {
    useAuthGuard();

    const t = useTranslations('');

    const { slug } = useParams();
    const router = useRouter();
    const { data: post } = useSWR(slug, () => getPostBySlugApi(slug as string));

    const { trigger: replyPost, isMutating } = useSWRMutation(
        'replyPost',
        (_, { arg }: { arg: ICreateComment }) => replyPostApi(post?.documentId as string, arg)
    );

    const handleSubmit = async (values: ICommentEditorForm) => {
        await replyPost(values);
        router.replace(POST_DETAIL_PATH(slug as string));
    }

    const handleDiscard = () => {
        router.replace(POST_DETAIL_PATH(slug as string));
    }

    return (
        <Stack spacing={4}>
            <CommentEditor
                onSubmit={handleSubmit}
                onCancel={handleDiscard}
                submitting={isMutating}
            />
            <CommentList postId={post?.documentId as string} />
        </Stack>
    );
}