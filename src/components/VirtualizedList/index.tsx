'use client';
import { Box, List, ListItem, SxProps } from '@mui/material';
import { throttle } from 'lodash';
import { JSX, useRef } from 'react';
import LoadingFooter from './LoadingFooter';

export interface IVirtualizedListProps<T> {
    data: T[];
    hasNextPage?: boolean;
    keyExtractor?: (item: T, index: number) => string;
    renderItem: (data: T, index: number) => JSX.Element;
    onBottomReach?: () => void;
    listStyle?: SxProps;
}

// NOTE: Prefer using library like react-window, just do it myself because I not found any library support Next.js 15
export default function VirtualizedList<T>({
    renderItem,
    data,
    hasNextPage,
    keyExtractor = ((item, index) => `vl-${index}`),
    listStyle,
    onBottomReach,
}: IVirtualizedListProps<T>) {
    const scrollRef = useRef({ previousScrollTop: 0 });
    const handleScrollToBottom = throttle(() => {
        if (hasNextPage && onBottomReach) {
            onBottomReach();
        }

    }, 1000);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop: currentScrollTop } = event.currentTarget;
        const { previousScrollTop } = scrollRef.current;
        const isScrollDown = currentScrollTop > previousScrollTop;
        scrollRef.current = { previousScrollTop: currentScrollTop };

        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (isScrollDown && scrollTop + clientHeight >= scrollHeight - clientHeight) {
            handleScrollToBottom();
        }
    };

    return (
        <Box sx={{ overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' } }} onScroll={handleScroll}>
            <List sx={listStyle}>
                {data.map((item, index) => (
                    <ListItem key={keyExtractor(item, index)} disablePadding divider>
                        {renderItem(item, index)}
                    </ListItem>
                ))}
                {hasNextPage && (
                    <ListItem>
                        <LoadingFooter />
                    </ListItem>
                )}
            </List>
        </Box>
    )
}