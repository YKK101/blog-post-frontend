'use client';
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButtonProps } from "@mui/material/IconButton";
import styled from "@emotion/styled";
import { COLOR } from "@/theme/color";
import { useRouter } from "next/navigation";

type IBackButtonProps = IconButtonProps & {
    variant?: "filled" | "standard";
}

const StyledIconButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'variant'
}) <IBackButtonProps>`
    ${(props) => (props.variant === 'filled' ? `
        background-color: ${COLOR.GREEN_100};
    ` : '')}
`;

export default function BackButton({ variant = 'standard', ...props }: IBackButtonProps) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    return (
        <StyledIconButton variant={variant} onClick={handleBack} {...props}>
            <ArrowBackIcon />
        </StyledIconButton>
    )
}