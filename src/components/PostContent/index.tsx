import { ICategory } from "@/types/category";
import { IPost } from "@/types/post";
import { Avatar, Chip, Grid2 as Grid, Stack, Typography } from "@mui/material";
import CommentCount from "@/components/CommentCount";

export interface IPostContentProps {
    post: IPost | undefined
}

export default function PostContent({ post }: IPostContentProps) {
    // FIXME: Loading Skeleton
    if (!post) return null;

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={post?.author?.profilePictureUrl} alt={post?.author?.displayName} />
                <Typography>{post?.author?.displayName}</Typography>
            </Stack>
            <Grid container spacing={1}>
                {post.categories?.map((category: ICategory) => (
                    <Grid key={category.documentId} size="auto">
                        <Chip label={category.name} size="small" />
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h6">{post.title}</Typography>
            <Typography
                variant="body2"
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical'
                }}
            >
                {post.content}
            </Typography>
            <CommentCount commentCount={post.commentCount} />
        </Stack >
    );
}

