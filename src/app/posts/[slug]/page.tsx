import { getPostBySlugApi } from "@/api/apiRoute";
import { IPost } from "@/types/post";
import { Box, Container, Stack } from "@mui/material";
import { COLOR } from "@/theme/color";
import PostContent from "@/components/PostContent";
import BackButton from "@/components/BackButton";

export default async function PostDetail({ params }: any) {
    const { slug } = await params;
    const post: IPost = await getPostBySlugApi(slug);

    return (
        <Box width="100%" height="100%" bgcolor={COLOR.WHITE}>
            <Container maxWidth="md">
                <Stack alignItems="start" spacing={4} py={4}>
                    <BackButton variant="filled" />
                    <PostContent post={post} />
                </Stack>
            </Container>
        </Box>
    );
}
