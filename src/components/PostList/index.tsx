'use client';
import { Stack, SxProps } from "@mui/material";
import VirtualizedList from "../VirtualizedList";
import PostCard, { IPostCardActions } from "./PostCard";
import { lightTheme } from "@/theme/theme";
import { IPost } from "@/types/post";
import { useRouter } from "next/navigation";
import { POST_DELETE_PATH, POST_DETAIL_PATH, POST_EDIT_PATH } from "@/constants/routes";

export interface IPostListProps {
    data: IPost[];
    hasNextPage?: boolean;
    onClick?: (post: IPost) => void;
    onBottomReach?: () => void;
    actions?: IPostCardActions[]
}

export default function PostList({
    data,
    hasNextPage = false,
    onClick = () => { },
    onBottomReach = () => { },
    actions = [],
}: IPostListProps) {
    const router = useRouter();
    const keyExtractor = (item: IPost) => `pl-${item.documentId}`;

    const handlePostClick = (post: IPost) => {
        router.push(POST_DETAIL_PATH(post.slug));
    }

    const handleActionClick = (action: IPostCardActions, post: IPost) => {
        if (action === 'like') {

        } else if (action === 'edit') {
            router.push(POST_EDIT_PATH(post.documentId));
        } else if (action === 'delete') {
            router.push(POST_DELETE_PATH(post.documentId));
        }
    }

    const renderItem = (item: IPost, index: number) => {
        const isFirst = index === 0;
        const isLast = index === data.length - 1;

        const sx: SxProps = {
            borderRadius: 0,
            ...(isFirst && {
                borderTopLeftRadius: lightTheme.shape.borderRadius,
                borderTopRightRadius: lightTheme.shape.borderRadius,
            }),
            ...(isLast && {
                borderBottomLeftRadius: lightTheme.shape.borderRadius,
                borderBottomRightRadius: lightTheme.shape.borderRadius,
            }),
        };

        return (
            <PostCard post={item} sx={sx} onClick={handlePostClick} actions={actions} onActionClick={handleActionClick} />
        )
    }

    return (
        <Stack className="w-full h-full">
            <VirtualizedList
                keyExtractor={keyExtractor}
                data={data}
                hasNextPage={hasNextPage}
                renderItem={renderItem}
                onBottomReach={onBottomReach}
                listStyle={{ paddingBottom: 4 }}
            />
        </Stack>
    );
}