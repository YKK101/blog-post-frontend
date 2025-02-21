'use client';

import { getPostApi, updatePostApi } from "@/api/apiRoute";
import PostEditor from "@/components/PostEditor";
import { POST_DETAIL_PATH } from "@/constants/routes";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { ICreatePost } from "@/types/post";
import { Modal } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditPostModal() {
    useAuthGuard();

    const { documentId } = useParams();
    const router = useRouter();

    const { data: post, isLoading } = useSWR(
        'getPost',
        (_: string) => getPostApi(documentId as string),
    );

    const { trigger: updatePost, isMutating } = useSWRMutation(
        'updatePost',
        async (_, { arg }: { arg: ICreatePost }) => updatePostApi(documentId as string, arg)
    );

    const handleSave = async (values: ICreatePost) => {
        const updatedPost = await updatePost(values);
        router.replace(POST_DETAIL_PATH(updatedPost.slug));
    }

    const handleCancel = () => {
        router.back();
    }

    if (isLoading) return <Modal open><div /></Modal>

    return (
        <PostEditor
            initialValues={{
                categories: post?.categories?.map((category) => category.documentId).join(', ') || '',
                title: post?.title || '',
                content: post?.content || '',
            }}
            onSubmit={handleSave}
            onCancel={handleCancel}
            submitting={isMutating}
        />
    );
}