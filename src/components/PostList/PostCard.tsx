import { Grid2 as Grid, Card, CardContent, CardHeader, Chip, IconButton, Stack, Typography } from "@mui/material";
import Avatar from "@/components/Avatar";
import StarIcon from '@/assets/star-icon.svg';
import PencilIcon from '@/assets/pencil-icon.svg';
import TrashIcon from '@/assets/trash-icon.svg';
import { COLOR } from "@/theme/color";
import { IPost } from "@/types/post";
import { ICategory } from "@/types/category";
import { SxProps } from "@mui/system";
import CommentCount from "../CommentCount";

export type IPostCardActions = 'like' | 'edit' | 'delete';

export interface IPostCardProps {
    post: IPost;
    actions?: IPostCardActions[];
    onActionClick?: (action: IPostCardActions, post: IPost) => void;
    onClick?: (post: IPost) => void;
    sx?: SxProps;
}

function PostCardActions({ actions, onActionClick }: {
    actions: IPostCardActions[],
    onActionClick?: (action: IPostCardActions) => void
}) {
    const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, action: IPostCardActions) => {
        event.stopPropagation();
        onActionClick?.(action);
    }

    return (
        <Stack direction="row">
            {actions.map(action => (
                <IconButton key={action} onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleActionClick(event, action)}>
                    {action === 'like' && <StarIcon stroke={COLOR.GREY_300} />}
                    {action === 'edit' && <PencilIcon stroke={COLOR.GREY_300} />}
                    {action === 'delete' && <TrashIcon stroke={COLOR.GREY_300} />}
                </IconButton>
            ))}
        </Stack>
    );
}

export default function PostCard({
    post,
    actions = [],
    onClick = (_: IPost) => { },
    sx,
    onActionClick = (_: IPostCardActions) => { }
}: IPostCardProps) {
    const handleClick = () => {
        onClick(post);
    }

    const handleActionClick = (action: IPostCardActions) => {
        onActionClick(action, post);
    }

    return (
        <Card className="w-full cursor-pointer" elevation={0} sx={sx} onClick={handleClick}>
            <CardHeader
                avatar={
                    <Avatar size="small" src={post.author?.profilePictureUrl} alt={post.author?.displayName} />
                }
                title={post.author?.displayName || ""}
                action={<PostCardActions actions={actions} onActionClick={handleActionClick} />}
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