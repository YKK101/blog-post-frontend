import { ISearchPostsApiParams } from "@/types/api";
import backendClient from "./backendClient";
import { IPost } from "@/types/post";
import { ISearchResult } from "@/types/searchResult";
import { CancelToken } from "axios";
import { ICategory } from "@/types/category";

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

export const searchPostsApi = async (params: ISearchPostsApiParams, cancelToken?: CancelToken.source | null): Promise<ISearchResult<IPost>> => {
    const { data } = await backendClient.get("/posts", { params, cancelToken });
    return data;
}

export const listCategories = async (): Promise<ICategory[]> => {
    const { data } = await backendClient.get("/categories");
    return data;
}