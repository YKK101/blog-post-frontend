import { COLOR } from '@/theme/color';
import MuiInput, { InputProps } from '@mui/material/Input';
import styled from '@emotion/styled';

type StyledInputProps = InputProps & { variant?: 'filled' | 'outlined', focusColor?: string }

const StyledInput = styled(MuiInput, {
    shouldForwardProp: (prop) => !['variant', 'focusColor'].includes(prop),
}) <StyledInputProps>`
    transition: border 0.2s ease-in-out;
    border: 2px solid ${COLOR.GREY_100};

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
        border: 2px solid ${(props) => props.focusColor};
        box-shadow: 0px 0px 5px 0px ${(props) => props.focusColor}CC;
    }

    &.Mui-error {
        border: 2px solid ${COLOR.DANGER};
    }
`;

export default function Input(props: StyledInputProps) {
    const {
        variant = 'filled',
        focusColor = COLOR.LEAF_GREEN,
        ...rest
    } = props;

    return (
        <StyledInput variant={variant} focusColor={focusColor} {...rest} />
    )
};
