'use client';

import { deletePostApi } from "@/api/apiRoute";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { useParams } from "next/navigation";

export default function DeletePostModal() {
    const t = useTranslations('');

    const { documentId } = useParams();
    const router = useRouter();

    const { trigger: deletePost, isMutating } = useSWRMutation(
        'deletePost',
        async (_) => deletePostApi(documentId as string)
    );

    const handleDelete = async () => {
        await deletePost();
        router.back();
    }

    const handleCancel = () => {
        router.back();
    }

    return (
        <ConfirmDialog
            open
            title={t('post.deleteTitle')}
            content={t('post.deleteContent')}
            confirmText={t('post.deleteButton')}
            confirmColor="error"
            onCancel={handleCancel}
            onConfirm={handleDelete}
            confirming={isMutating}
        />
    )
}