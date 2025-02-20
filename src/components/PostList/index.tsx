import { Stack, SxProps } from "@mui/material";
import VirtualizedList from "../VirtualizedList";
import PostCard from "./PostCard";
import { lightTheme } from "@/theme/theme";
import { IPost } from "@/types/post";

export interface IPostListProps {
    data: IPost[];
    hasNextPage?: boolean;
    onBottomReach?: () => void;
}

export default function PostList({ data, hasNextPage = false, onBottomReach = () => { } }: IPostListProps) {
    const keyExtractor = (item: IPost, index: number) => `pl-${item.documentId}`;

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
            <PostCard post={item} sx={sx} />
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