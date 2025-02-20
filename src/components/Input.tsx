import { COLOR } from '@/theme/color';
import MuiInput, { InputProps } from '@mui/material/Input';
import styled from '@emotion/styled';

const StyledInput = styled(MuiInput, {
    shouldForwardProp: (prop) => prop !== 'variant',
}) <{ variant: 'filled' | 'outlined' }>`
    transition: border 0.2s ease-in-out;
    border: 2px solid ${COLOR.WHITE};

    ${props => props.variant === 'outlined' && `
        border: 2px solid ${COLOR.WHITE};
    `}
    ${props => props.variant === 'filled' && `
        background-color: ${COLOR.WHITE};
    `}

    min-height: 44px;
    border-radius: 8px;
    padding: 0px 8px;

    &.Mui-focused {
        border: 2px solid ${COLOR.GOLDEN};
        box-shadow: 0px 0px 5px 0px ${COLOR.GOLDEN}CC;
    }

    &.Mui-error {
        border: 2px solid ${COLOR.DANGER};
    }
`;

export default function Input(props: { variant?: 'filled' | 'outlined' } & InputProps) {
    const { variant = 'filled', ...rest } = props;

    return (
        <StyledInput variant={variant} {...rest} />
    )
};
