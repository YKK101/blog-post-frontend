'use client';
import { Button, Theme, useMediaQuery } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { POST_DETAIL_PATH, SIGNIN_PATH } from "@/constants/routes";
import DesktopCommentEditor from "./DesktopCommentEditor";
import ConfirmDialog from "../ConfirmDialog";
import MobileCommentEditor from "./MobileCommentEditor";

export interface ICommentEditorForm {
    content: string;
}

export interface ICommentEditorFormProps {
    initialValues: ICommentEditorForm;
    onSubmit: (values: ICommentEditorForm) => void;
    onCancel: () => void;
    submitting?: boolean;
}

export interface ICommentEditorProps {
    onSubmit: (values: ICommentEditorForm) => void;
    onCancel: () => void;
    submitting?: boolean;
}

export default function CommentEditor({ onSubmit, onCancel, submitting }: ICommentEditorProps) {
    const t = useTranslations('');
    const isMobielOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const [showDiscardConfirmDialog, setShowDiscardConfirmDialog] = useState<boolean>(false);

    const initialValues = { content: '' }

    const handleDiscard = () => {
        setShowDiscardConfirmDialog(false);
        onCancel();
    }

    return (
        <>
            {isMobielOrTablet ? (
                <MobileCommentEditor
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={() => { setShowDiscardConfirmDialog(true) }}
                    submitting={submitting}
                />
            ) : (
                <DesktopCommentEditor
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    onCancel={() => { setShowDiscardConfirmDialog(true) }}
                    submitting={submitting}
                />
            )}
            <ConfirmDialog
                open={showDiscardConfirmDialog}
                title={t('post.discardTitle')}
                content={t('post.discardContent')}
                confirmText={t('post.discardButton')}
                confirmColor="error"
                onCancel={() => { setShowDiscardConfirmDialog(false) }}
                onConfirm={handleDiscard}
            />
        </>
    )
}