'use client';
import PostFilter, { IPostFilterForm } from "@/components/PostFilter";
import PostList from "@/components/PostList";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { usePostSearch } from "@/hooks/usePostSearch";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";

const OUR_BLOG_INITIAL_FILTER = { categories: 'all', keyword: '' };

export default function OurBlog() {
    useAuthGuard();
    const { userProfile } = useAppSelector((state: RootState) => state.user);
    const { postList, isLoading, totalPostCount, getNextPosts, refreshPosts } = usePostSearch();
    const [searchParams, setSearchParams] = useState({
        keyword: OUR_BLOG_INITIAL_FILTER.keyword,
        categories: OUR_BLOG_INITIAL_FILTER.categories === 'all' ? [] : [OUR_BLOG_INITIAL_FILTER.categories],
    });

    const handleBottomReach = () => {
        if (isLoading) return;
        getNextPosts(searchParams.categories, userProfile ? [userProfile.id] : [], searchParams.keyword);
    }

    const handleSearchFilterChanged = (values: IPostFilterForm) => {
        setSearchParams((prev) => ({
            ...prev,
            keyword: values.keyword,
            categories: values.categories !== 'all' ? [values.categories] : [],
        }));
    }

    useEffect(() => {
        refreshPosts(searchParams.categories, userProfile ? [userProfile.id] : [], searchParams.keyword);
    }, [searchParams, userProfile])

    return (
        <Container
            maxWidth="md"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <PostFilter initialValues={OUR_BLOG_INITIAL_FILTER} onValuesChanged={handleSearchFilterChanged} />
            <Box flex={1} sx={{ overflow: 'hidden' }}>
                <PostList
                    data={postList}
                    hasNextPage={totalPostCount > postList.length}
                    onBottomReach={handleBottomReach}
                />
            </Box>
        </Container>
    );
}
