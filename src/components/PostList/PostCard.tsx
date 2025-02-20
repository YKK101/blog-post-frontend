import { Grid2 as Grid, Card, CardContent, CardHeader, Chip, IconButton, Stack, Typography } from "@mui/material";
import Avatar from "@/components/Avatar";
import StarIcon from '@/assets/star-icon.svg';
import { COLOR } from "@/theme/color";
import { IPost } from "@/types/post";
import { ICategory } from "@/types/category";
import { SxProps } from "@mui/system";
import CommentCount from "../CommentCount";

export interface IPostCardProps {
    post: IPost;
    likeable?: boolean;
    sx?: SxProps;
}

export default function PostCard({ post, likeable = false, sx }: IPostCardProps) {
    return (
        <Card className="w-full" elevation={0} sx={sx}>
            <CardHeader
                avatar={
                    <Avatar size="small" src={post.author?.profilePictureUrl} alt={post.author?.displayName} />
                }
                title={post.author?.displayName || ""}
                action={likeable ? (
                    <IconButton>
                        <StarIcon stroke={COLOR.GREY_300} />
                    </IconButton>
                ) : null}
            />
            <CardContent className="pt-0">
                <Stack spacing={1}>
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
                </Stack>
            </CardContent>
        </Card>
    )
}