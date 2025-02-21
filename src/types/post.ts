import { IUser } from "./user"
import { ICategory } from "./category"

export interface ICreatePost {
    title: string;
    content: string;
    categories: string[];
}

export interface IPost {
    documentId: string;
    title: string;
    content: string;
    author: IUser;
    categories: ICategory[];
    commentCount: number;
    slug: string;
}