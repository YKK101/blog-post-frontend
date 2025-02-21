import { IComment } from "@/types/post";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Avatar from "@/components/Avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { COLOR } from "@/theme/color";

dayjs.extend(relativeTime)

export interface ICommentCardProps {
    comment: IComment;
    sx?: SxProps;
}

export default function CommentCard({ comment, sx }: ICommentCardProps) {
    return (
        <Card className="w-full" elevation={0} sx={sx}>
            <CardContent className="pt-0">
                <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1} p={2}>
                        <Avatar size="small" src={comment.author?.profilePictureUrl} alt={comment.author?.displayName} />
                        <Typography>{comment.author?.displayName || ""}</Typography>
                        <Typography color={COLOR.GREY_100}>{dayjs(comment.createdAt).fromNow()}</Typography>
                    </Stack>
                    <Stack spacing={1}>
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
                            {comment.content}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}