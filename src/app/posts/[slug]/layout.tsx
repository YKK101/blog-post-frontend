import { Box, Container, Stack } from "@mui/material";
import { COLOR } from "@/theme/color";
import BackButton from "@/components/BackButton";

export default function PostDetailLayout({ post, comment }: {
    post: React.ReactNode,
    comment: React.ReactNode
}) {
    return (
        <Box width="100%" height="100%" bgcolor={COLOR.WHITE}>
            <Container maxWidth="md" sx={{ overflow: 'scroll', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                <Stack spacing={4} py={4}>
                    <BackButton variant="filled" />
                    {post}
                    {comment}
                </Stack>
            </Container>
        </Box>
    );
}
