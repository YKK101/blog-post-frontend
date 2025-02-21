'use client';
import { Button, Grid2 as Grid, InputAdornment, MenuItem, Select } from "@mui/material";
import Input from '@/components/Input';
import { useTranslations } from 'next-intl';
import SearchIcon from '@/assets/search-icon.svg';
import { COLOR } from "@/theme/color";
import { useFormik } from "formik";
import { useEffect } from "react";
import useSWR from "swr";
import { listCategories } from "@/api/apiRoute";
import { ICategory } from "@/types/category";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { CREATE_POST_PATH } from "@/constants/routes";

export interface IPostFilterForm {
    categories: string;
    keyword: string;
}

export interface IPostFilter {
    initialValues?: IPostFilterForm;
    onValuesChanged?: (values: IPostFilterForm) => void;
}

export default function PostFilter({
    initialValues = { categories: 'all', keyword: '' },
    onValuesChanged,
}: IPostFilter) {
    const t = useTranslations('');
    const router = useRouter();
    const { data: categories } = useSWR('getCategory', () => listCategories());
    const formik = useFormik({ initialValues, onSubmit: () => { } })

    const handleCreatePost = () => {
        router.push(CREATE_POST_PATH);
    }

    useEffect(() => {
        onValuesChanged?.(formik.values)
    }, [formik.values])

    return (
        <form>
            <Grid container spacing={2} py={2}>
                <Grid size="grow">
                    <Input
                        fullWidth
                        variant="outlined"
                        placeholder={t('common.search')}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon stroke={COLOR.GREY_300} />
                            </InputAdornment>
                        }
                        {...formik.getFieldProps('keyword')}
                    />
                </Grid>
                <Grid size="auto">
                    <Select {...formik.getFieldProps('categories')} variant="standard" sx={{ width: 120 }}>
                        <MenuItem value="all">All</MenuItem>
                        {categories?.map((category: ICategory) => (
                            <MenuItem key={category.documentId} value={category.documentId}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size="auto">
                    <Button startIcon={<AddIcon />} onClick={handleCreatePost}>{t('post.createButton')}</Button>
                </Grid>
            </Grid>
        </form>
    );
}