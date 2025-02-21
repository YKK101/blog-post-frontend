'use client';
import { Grid2 as Grid, FormControl, FormHelperText, Stack, Button } from "@mui/material";
import { useFormik } from "formik"
import { ICommentEditorFormProps } from ".";
import { useTranslations } from "next-intl";
import Input from "@/components/Input";

export default function DesktopCommentEditor({ initialValues, onSubmit, onCancel, submitting }: ICommentEditorFormProps) {
    const t = useTranslations('');
    const formik = useFormik({
        initialValues,
        onSubmit,
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
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
                <Grid container spacing={2} justifyContent="end">
                    <Button variant="outlined" color="inherit" onClick={onCancel}>{t('common.cancel')}</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        loading={submitting}
                        disabled={formik.values.content === ''}
                    >
                        {t('comment.createButton')}
                    </Button>
                </Grid>
            </Stack>
        </form>
    )
}