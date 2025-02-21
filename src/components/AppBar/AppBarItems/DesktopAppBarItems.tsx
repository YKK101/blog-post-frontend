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
import ConfirmDialog from "@/components/ConfirmDialog";
import { useState } from "react";

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
    const t = useTranslations('');
    const dispatch = useAppDispatch();
    const handleSignOut = () => {
        dispatch(removeUser());
    };
    const [showSignOutDialog, setShowSignOutDialog] = useState(false);

    return (
        <>
            <Box px={2} py={1}>
                <Button onClick={() => setShowSignOutDialog(true)} variant="outlined">{t('auth.signOut')}</Button>
            </Box>

            <ConfirmDialog
                open={showSignOutDialog}
                title={t('auth.signOutTitle')}
                content={t('auth.signOutContent')}
                confirmText={t('auth.signOut')}
                confirmColor="error"
                onCancel={() => setShowSignOutDialog(false)}
                onConfirm={handleSignOut}
            />
        </>
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
