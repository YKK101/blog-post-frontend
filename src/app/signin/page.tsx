'use client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import * as Yup from 'yup';
import { useTranslations } from "next-intl";
import { lightTheme } from "@/theme/theme";
import { COLOR } from "@/theme/color";
import { useFormik } from "formik";
import useSWRMutation from "swr/mutation";
import { signInApi } from "@/api/apiRoute";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hook";
import { setUser } from "@/lib/slices/userSlices";
import { useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import Input from "@/components/Input";
import { HOME_PATH } from "@/constants/routes";
import { Key } from "swr";
import { IUser } from "@/types/user";
import ConfirmDialog from "@/components/ConfirmDialog";

function HeavyLoadDataPart() {
    const router = useRouter();
    const queryParams = useSearchParams();
    const { userProfile } = useAppSelector((state: RootState) => state.user);

    useEffect(() => {
        if (userProfile) {
            const redirect = queryParams?.get('redirect') || HOME_PATH;
            router.replace(redirect);
        }
    }, [userProfile, queryParams, router])

    return null;
}

export default function SignIn() {
    const t = useTranslations('');
    const dispatch = useAppDispatch();
    const isMobileAndTablet = useMediaQuery(lightTheme.breakpoints.down('md'));
    const layoutDirection = isMobileAndTablet ? 'column' : 'row-reverse';
    const { error, trigger: signIn, isMutating } = useSWRMutation<{ user: IUser }, any, Key, string>(
        "signin",
        (_: string, { arg }: { arg: string }) => signInApi(arg),
    );

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required(t('auth.usernameRequired')),
        }),
        onSubmit: async ({ username }) => {
            try {
                const { user } = await signIn(username);
                dispatch(setUser(user));
            } catch (_) {
                setIsDialogOpen(true);
            }
        }
    })

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Suspense>
                <HeavyLoadDataPart />
            </Suspense>
            <Stack
                width="100vw"
                height="100vh"
                overflow="hidden"
                bgcolor={lightTheme.palette.primary.dark}
                direction={layoutDirection}
            >
                <Stack
                    flex={1}
                    bgcolor={lightTheme.palette.primary.main}
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    className="rounded-tl-[0px] md:rounded-tl-[36px] rounded-bl-[36px] rounded-br-[36px] md:rounded-br-[0px]"
                >
                    <Image
                        src="/signin-decorator.svg"
                        alt="notebook-and-stationaries-image"
                        width={240}
                        height={240}
                    />
                    <Image src="/logo-white.svg" alt="logo" width={80} height={60} />
                </Stack>
                <Box flex={1.2}>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-full h-full flex flex-col justify-center items-center flex-grow-1"
                    >
                        <Stack width="80%" maxWidth={380} spacing={2}>
                            <Typography variant="h5" fontWeight="bold" color={COLOR.WHITE}>{t('auth.signIn')}</Typography>
                            <FormControl>
                                <Input
                                    title={t('auth.username')}
                                    focusColor={COLOR.GOLDEN}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    {...formik.getFieldProps('username')}
                                />
                                <FormHelperText error>
                                    {formik.touched.username && formik.errors.username}
                                </FormHelperText>
                            </FormControl>
                            <Button
                                type="submit"
                                loading={isMutating}
                                disabled={isMutating}
                            >
                                {t('auth.signIn')}
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack >
            <ConfirmDialog
                open={isDialogOpen}
                title={error?.message || t('auth.signInErrorUnknown')}
                onConfirm={handleCloseDialog}
            />
        </>
    );
}
