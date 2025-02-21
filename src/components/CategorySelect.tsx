'use client';
import MuiSelect, { SelectProps } from '@mui/material/Select';
import styled from '@emotion/styled';
import { COLOR } from '@/theme/color';
import { lightTheme } from '@/theme/theme';
import useSWR from 'swr';
import { listCategories } from '@/api/apiRoute';
import { ICategory } from '@/types/category';
import { MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';

type StyledSelectProps = SelectProps & {
    placeholder?: string;
    error?: boolean;
}

const StyledSelect = styled(MuiSelect) <StyledSelectProps>`
    border: ${(props) => props.error ? `2px solid ${COLOR.DANGER}` : `2px solid ${COLOR.LEAF_GREEN}`};
    border-radius: ${lightTheme.shape.borderRadius}px;
    color: ${(props) => props.error ? COLOR.DANGER : COLOR.LEAF_GREEN};

    .MuiSvgIcon-root {
        color: ${(props) => props.error ? COLOR.DANGER : COLOR.LEAF_GREEN};
    }
`;

export default function CategorySelect({ placeholder, ...props }: StyledSelectProps) {
    const t = useTranslations('');
    const { data: categories } = useSWR('getCategory', () => listCategories());
    const valueRenderer = (value: any) => {
        if (!value) return placeholder || t('category.placeholder');

        const selectedCategory = categories?.find(category => category.documentId === value);
        return selectedCategory?.name || '';
    }

    return (
        <StyledSelect
            displayEmpty={true}
            renderValue={valueRenderer}
            {...props}
        >
            {categories?.map((category: ICategory) => (
                <MenuItem key={category.documentId} value={category.documentId}>
                    {category.name}
                </MenuItem>
            ))}
        </StyledSelect>
    );
}
