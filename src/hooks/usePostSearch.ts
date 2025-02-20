import { searchPostsApi } from "@/api/apiRoute";
import { useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import { IPost } from "@/types/post";
import { ISearchPostsApiParams } from "@/types/api";
import { PublicationState } from "@/constants/enum";
import axios, { CancelToken } from "axios";

interface IUsePostSearchParams {
    publicationState?: PublicationState;
    withAuthor?: boolean;
    limit?: number;
    sort?: string[];
}

export const usePostSearch = (params?: IUsePostSearchParams) => {
    const {
        publicationState = PublicationState.LIVE,
        withAuthor = true,
        limit = 20,
        sort = ['createdAt:desc'],
    } = params || {};
    const [totalPostCount, setTotalPostCount] = useState(0);
    const [postList, setPostList] = useState<IPost[]>([]);

    const cancelTokenRef = useRef<CancelToken.source | null>(null);

    const { trigger, isMutating: isLoading } = useSWRMutation(
        'searchPosts',
        async (_: any, { arg }: any) => {
            try {
                const { categories = [], authors = [], start = 0, keyword = '' } = arg || {};
                const params: ISearchPostsApiParams = {
                    publicationState,
                    withAuthor,
                    pagination: {
                        start,
                        limit,
                    },
                    sort,
                    categories,
                    authors,
                    keyword,
                };

                if (cancelTokenRef.current) {
                    cancelTokenRef.current.cancel('Request cancelled due to new request');
                }
                cancelTokenRef.current = axios.CancelToken.source();

                const res = await searchPostsApi(params, cancelTokenRef.current.token);

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

    const getNextPosts = async (categories?: string[], authors?: string[], keyword?: string, start = postList.length) => {
        const { data, total } = await trigger({ categories, authors, start, keyword });
        setPostList((current) => [...current, ...data]);
        setTotalPostCount(total);
    };

    const refreshPosts = async (categories: string[], authors?: string[], keyword?: string) => {
        setPostList([]);
        setTotalPostCount(0);
        await getNextPosts(categories, authors, keyword, 0);
    }

    return {
        totalPostCount,
        postList,
        isLoading,
        refreshPosts,
        getNextPosts,
    };
};
