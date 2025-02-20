import { PublicationState } from "@/constants/enum";

export interface IPagination {
    start?: number;
    limit?: number;
}

export interface ISearchPostsApiParams {
    publicationState?: PublicationState;
    withAuthor?: boolean;
    pagination?: IPagination;
    sort?: string[];
    categories?: string[];
    authors?: string[];
    keyword?: string;
}