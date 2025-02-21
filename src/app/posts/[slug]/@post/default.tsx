import { getPostBySlugApi } from "@/api/apiRoute";
import { IPost } from "@/types/post";
import PostContent from "@/components/PostContent";

export default async function PostDetail({ params }: any) {
    const { slug } = await params;
    const post: IPost = await getPostBySlugApi(slug);

    return <PostContent post={post} />;
}
