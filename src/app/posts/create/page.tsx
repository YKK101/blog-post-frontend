'use client';
import PostEditor from "@/components/PostEditor";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { createPostApi } from "@/api/apiRoute";
import { ICreatePost } from "@/types/post";
import { POST_DETAIL_PATH } from "@/constants/routes";

export default function CreatePost() {
    useAuthGuard();
    const router = useRouter();
    const { trigger: createPost, isMutating } = useSWRMutation(
        'createPost',
        async (_, { arg }: { arg: ICreatePost }) => createPostApi(arg)
    );

    const handleSave = async (values: ICreatePost) => {
        const createdPost = await createPost(values);
        router.push(POST_DETAIL_PATH(createdPost.slug));
    }

    const handleCancel = () => {
        router.back();
    }

    return (
        <PostEditor onSubmit={handleSave} onCancel={handleCancel} submitting={isMutating} />
    );
}