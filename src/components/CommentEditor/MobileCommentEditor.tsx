'use client';
import { Grid2 as Grid, FormControl, FormHelperText, Stack, Button, Typography } from "@mui/material";
import { useFormik } from "formik"
import { ICommentEditorFormProps } from ".";
import { useTranslations } from "next-intl";
import Input from "@/components/Input";
import Modal from "../Modal";

export default function MobileCommentEditor({ initialValues, onSubmit, onCancel, submitting }: ICommentEditorFormProps) {
    const t = useTranslations('');
    const formik = useFormik({
        initialValues,
        onSubmit,
    })
    return (
        <Modal open>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <Typography variant="h6">{t('comment.commentEditorTitle')}</Typography>
                    <FormControl>
                        <Input
                            multiline
                            minRows={5}
                            maxRows={5}
                            error={!!formik.errors.content}
                            {...formik.getFieldProps('content')}
                        />
                        <FormHelperText>{formik.errors.content}</FormHelperText>
                    </FormControl>
                    <Button variant="outlined" color="inherit" onClick={onCancel}>{t('common.cancel')}</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        loading={submitting}
                        disabled={formik.values.content === ''}
                    >
                        {t('comment.createButton')}
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}