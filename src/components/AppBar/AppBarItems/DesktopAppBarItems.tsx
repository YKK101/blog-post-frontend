'use client';
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Avatar from "@/components/Avatar";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { removeUser } from "@/lib/slices/userSlices";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/user";
import { SIGNIN_PATH } from "@/constants/routes";

function GuestItems() {
    const t = useTranslations('auth');
    const router = useRouter();

    const handleSignIn = () => {
        router.push(SIGNIN_PATH);
    };

    return (
        <Button onClick={handleSignIn}>
            {t('signIn')}
        </Button>
    );
}

function ProfileToolTip() {
    const t = useTranslations('auth');
    const dispatch = useAppDispatch();
    const handleSignOut = () => {
        dispatch(removeUser());
    };

    return (
        <Box px={2} py={1}>
            <Button onClick={handleSignOut} variant="outlined">{t('signOut')}</Button>
        </Box>
    )
}

function AuthItems({ userProfile }: { userProfile: IUser | null }) {
    return (
        <Tooltip title={<ProfileToolTip />} arrow>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography fontWeight="bold">
                    {userProfile?.displayName}
                </Typography>
                <Avatar src={userProfile?.profilePictureUrl} alt={userProfile?.displayName} size="small" />
            </Stack>
        </Tooltip>
    );
}

export default function DesktopAppBarItems() {
    const userProfile = useAppSelector((state: RootState) => state.user.userProfile);

    return userProfile ? (
        <AuthItems userProfile={userProfile} />
    ) : (
        <GuestItems />
    );
}
