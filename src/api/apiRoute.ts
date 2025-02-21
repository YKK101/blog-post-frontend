import { ISearchCommentsApiParams, ISearchPostsApiParams } from "@/types/api";
import backendClient from "./backendClient";
import { IComment, ICreateComment, ICreatePost, IPost } from "@/types/post";
import { ISearchResult } from "@/types/searchResult";
import { CancelToken } from "axios";
import { ICategory } from "@/types/category";
import { IUser } from "@/types/user";

export const signInApi = async (username: string) => {
    const { data } = await backendClient.post("/auth/signin", { username })
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
    }

    return data;
};

export const signOutApi = async () => {
    localStorage.removeItem('accessToken');
};

export const getUserProfileApi = async (): Promise<IUser> => {
    const { data } = await backendClient.get("/me");
    return data;
}

export const getPostApi = async (documentId: string): Promise<IPost> => {
    const { data } = await backendClient.get(`/posts/${documentId}`, { params: { withAuthor: true } });
    return data;
}

export const getPostBySlugApi = async (slug: string): Promise<IPost> => {
    const { data } = await backendClient.get(`/posts/slugs/${slug}`, { params: { withAuthor: true } });
    return data;
}

export const createPostApi = async (post: ICreatePost): Promise<IPost> => {
    const { data } = await backendClient.post("/posts", post);
    return data;
}

export const updatePostApi = async (documentId: string, post: ICreatePost): Promise<IPost> => {
    const { data } = await backendClient.patch(`/posts/${documentId}`, post);
    return data;
}

export const deletePostApi = async (documentId: string): Promise<IPost> => {
    const { data } = await backendClient.delete(`/posts/${documentId}`);
    return data;
}

export const searchPostsApi = async (params: ISearchPostsApiParams, cancelToken?: CancelToken | undefined): Promise<ISearchResult<IPost>> => {
    const { data } = await backendClient.get("/posts", { params, cancelToken });
    return data;
}

export const replyPostApi = async (postDocumentId: string, comment: ICreateComment): Promise<IPost> => {
    const { data } = await backendClient.post(`/posts/${postDocumentId}/comments`, comment);
    return data;
}

export const searchCommentsApi = async (postDocumentId: string, params: ISearchCommentsApiParams, cancelToken?: CancelToken | undefined): Promise<ISearchResult<IComment>> => {
    const { data } = await backendClient.get(`/posts/${postDocumentId}/comments`, { params, cancelToken });
    return data;
}


export const listCategories = async (): Promise<ICategory[]> => {
    const { data } = await backendClient.get("/categories");
    return data;
}