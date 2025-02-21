'use client';

import { useEffect } from 'react';
import { removeUser, setUser } from '@/lib/slices/userSlices';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { RootState } from '@/lib/store';
import { getUserProfileApi } from '@/api/apiRoute';
import useSWRMutation from 'swr/mutation';

export default function AuthListener({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { userProfile } = useAppSelector((state: RootState) => state.user);
    const { trigger: getUserProfile } = useSWRMutation('getUserProfile', (_) => getUserProfileApi());

    const handleStorageChange = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (userProfile && !accessToken) {
            dispatch(removeUser());
        } else if (accessToken && !userProfile) {
            const userData = await getUserProfile();
            if (userData) {
                dispatch(setUser(userData));
            }
        }
    };

    useEffect(() => {
        handleStorageChange();
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch, userProfile]);

    return children;
}