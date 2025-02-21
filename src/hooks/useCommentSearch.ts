import { searchCommentsApi } from "@/api/apiRoute";
import { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import { IComment } from "@/types/post";
import { ISearchCommentsApiParams } from "@/types/api";
import axios, { CancelTokenSource } from "axios";

interface IUseCommentSearchParams {
    postId: string;
    take?: number;
}

export const useCommentSearch = (params?: IUseCommentSearchParams) => {
    const {
        postId,
        take = 20,
    } = params || {};
    const [totalCommentCount, setTotalCommentCount] = useState(0);
    const [commentList, setCommentList] = useState<IComment[]>([]);

    const cancelTokenRef = useRef<CancelTokenSource | null>(null);

    const { trigger, isMutating: isLoading } = useSWRMutation(
        'searchComments',
        async (_, { arg }: { arg: { skip: number } }) => {
            try {
                if (!postId) throw new Error('postId is required');
                const { skip = 0 } = arg || {};
                const params: ISearchCommentsApiParams = { skip, take };

                if (cancelTokenRef.current) {
                    cancelTokenRef.current.cancel('Request cancelled due to new request');
                }
                cancelTokenRef.current = axios.CancelToken.source();

                const res = await searchCommentsApi(postId, params, cancelTokenRef.current.token);

                return res
            } catch (error) {
                if (axios.isCancel(error)) {
                    return { data: [], total: 0 };
                }

                throw error;
            }
        },
        {
            revalidate: false,
            populateCache: true,
        }
    );

    const getNextComments = async (skip = commentList.length) => {
        const { data, total } = await trigger({ skip });
        setCommentList((current) => [...current, ...data]);
        setTotalCommentCount(total);
    };

    const refreshComments = async () => {
        setCommentList([]);
        setTotalCommentCount(0);
        await getNextComments(0);
    }

    useEffect(() => {
        if (postId) {
            refreshComments();
        }
    }, [postId])

    return {
        totalCommentCount,
        commentList,
        isLoading,
        refreshComments,
        getNextComments,
    };
};
