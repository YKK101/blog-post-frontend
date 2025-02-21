import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hook';
import { RootState } from '@/lib/store';
import { useEffect } from 'react';

export const useAuthGuard = () => {
    const router = useRouter();
    const pathname = usePathname();
    const user = useAppSelector((state: RootState) => state.user.userProfile);

    useEffect(() => {
        if (!user && pathname) {
            const redirect = encodeURIComponent(pathname);
            router.push(`/signin?redirect=${redirect}`);
        }
    }, [user, pathname, router])
};
