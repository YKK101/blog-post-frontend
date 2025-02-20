'use client';
import { Box, Container } from "@mui/material";
import PostList from "@/components/PostList";
import { usePostSearch } from "@/hooks/usePostSearch";
import { useEffect, useState } from "react";
import PostFilter, { IPostFilterForm } from "@/components/PostFilter";

const HOME_INITIAL_FILTER = { categories: 'all', keyword: '' };

export default function Home() {
  const { postList, isLoading, totalPostCount, getNextPosts, refreshPosts } = usePostSearch();
  const [searchParams, setSearchParams] = useState({
    authors: [],
    keyword: HOME_INITIAL_FILTER.keyword,
    categories: HOME_INITIAL_FILTER.categories === 'all' ? [] : [HOME_INITIAL_FILTER.categories],
  });

  const handleBottomReach = () => {
    if (isLoading) return;
    getNextPosts(searchParams.categories, searchParams.authors, searchParams.keyword);
  }

  const handleSearchFilterChanged = (values: IPostFilterForm) => {
    setSearchParams((prev) => ({
      ...prev,
      keyword: values.keyword,
      categories: values.categories !== 'all' ? [values.categories] : [],
    }));
  }

  useEffect(() => {
    refreshPosts(searchParams.categories, searchParams.authors, searchParams.keyword);
  }, [searchParams])

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PostFilter initialValues={HOME_INITIAL_FILTER} onValuesChanged={handleSearchFilterChanged} />
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

