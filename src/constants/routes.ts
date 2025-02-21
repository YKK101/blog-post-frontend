export const HOME_PATH = '/';
export const SIGNIN_PATH = '/signin';
export const OUR_BLOG_PATH = '/our-blog';
export const CREATE_POST_PATH = '/posts/create';
export const POST_DETAIL_PATH = (slug: string) => `/posts/${slug}`;
export const POST_DETAIL_REPLY_PATH = (slug: string) => `/posts/${slug}/reply`;
export const POST_EDIT_PATH = (documentId: string) => `/posts/ids/${documentId}/edit`;
export const POST_DELETE_PATH = (documentId: string) => `/posts/ids/${documentId}/delete`;