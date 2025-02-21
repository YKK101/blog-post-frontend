import CommentCard from "./CommentCard";
import VirtualizedList from "../VirtualizedList";
import { IComment } from "@/types/post";
import { useCommentSearch } from "@/hooks/useCommentSearch";
import { useEffect } from "react";

export interface ICommentListProps {
    postId: string;
}

export default function CommentList({ postId }: ICommentListProps) {
    const { commentList, isLoading, totalCommentCount, getNextComments, refreshComments } = useCommentSearch({ postId });
    const hasNextPage = totalCommentCount > commentList.length;
    const handleBottomReach = () => {
        if (isLoading) return;
        getNextComments();
    }

    const keyExtractor = (item: IComment) => `pl-${item.id}`;

    const renderItem = (item: IComment, index: number) => {
        return (
            <CommentCard comment={item} />
        )
    }

    return (
        <VirtualizedList
            keyExtractor={keyExtractor}
            data={commentList}
            hasNextPage={hasNextPage}
            renderItem={renderItem}
            onBottomReach={handleBottomReach}
            listStyle={{ paddingBottom: 4 }}
        />
    )
}