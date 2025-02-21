import { Button, FormControl, FormHelperText, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Modal from '@/components/Modal';
import CategorySelect from "@/components/CategorySelect";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Input from "@/components/Input";
import { ICreatePost } from "@/types/post";
import ConfirmDialog from "../ConfirmDialog";
import { useState } from "react";

export interface IPostEditorForm {
    categories: string;
    title: string;
    content: string;
}

export interface IPostEditorProps {
    initialValues?: IPostEditorForm;
    submitting?: boolean;
    onSubmit: (values: ICreatePost) => void;
    onCancel: () => void;
}

export default function PostEditor({
    initialValues = { categories: '', title: '', content: '' },
    submitting = false,
    onSubmit,
    onCancel,
}: IPostEditorProps) {
    const t = useTranslations('');
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            categories: Yup.string().required(t('category.categoriesRequired')).notOneOf(['']),
            title: Yup.string().required(t('post.titleRequired')).notOneOf(['']),
            content: Yup.string().required(t('post.contentRequired')).notOneOf(['']),
        }),
        onSubmit: (values) => {
            onSubmit({
                categories: values.categories.split(','),
                title: values.title,
                content: values.content,
            });
        },
    })
    const [showDiscardConfirmDialog, setShowDiscardConfirmDialog] = useState(false);

    const handleCancel = () => {
        setShowDiscardConfirmDialog(true);
    }

    const handleConfirmDiscard = () => {
        setShowDiscardConfirmDialog(false)
        onCancel();
    }

    const handleCancelDiscard = () => {
        setShowDiscardConfirmDialog(false);
    }

    return (
        <>
            <Modal
                open
            >
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <Typography variant="h5" fontWeight="bold">
                            {!!initialValues.title ? t('post.editTitle') : t('post.createTitle')}
                        </Typography>

                        <FormControl>
                            <CategorySelect {...formik.getFieldProps('categories')} error={!!formik.errors.categories} />
                            <FormHelperText error>{formik.errors.categories}</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <Input
                                placeholder={t('post.titlePlaceholder')}
                                error={!!formik.errors.title}
                                {...formik.getFieldProps('title')}
                            />
                            <FormHelperText error>{formik.errors.title}</FormHelperText>
                        </FormControl>

                        <FormControl>
                            <Input
                                error={!!formik.errors.content}
                                multiline
                                minRows={10}
                                maxRows={10}
                                {...formik.getFieldProps('content')}
                                placeholder={t('post.contentPlaceholder')}
                            />
                            <FormHelperText error>{formik.errors.content}</FormHelperText>
                        </FormControl>

                        <Stack direction="row" spacing={2} justifyContent="end">
                            <Button variant="outlined" onClick={handleCancel} className="w-[105px]">{t('common.cancel')}</Button>
                            <Button variant="contained" type="submit" className="w-[105px]" loading={submitting}>
                                {t('post.savePostButton')}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Modal>
            <ConfirmDialog
                open={showDiscardConfirmDialog}
                title={t('post.discardTitle')}
                content={t('post.discardContent')}
                confirmText={t('post.discardButton')}
                confirmColor="error"
                onCancel={handleCancelDiscard}
                onConfirm={handleConfirmDiscard}
            />
        </>
    )
}