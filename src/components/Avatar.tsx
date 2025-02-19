"use client"

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import MuiAvatar from "@mui/material/Avatar";

const sizes = {
  small: css`
    width: 30px;
    height: 30px;
  `,
  medium: css`
    width: 40px;
    height: 40px;
  `,
  large: css`
    width: 60px;
    height: 60px;
  `,
};

const Avatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== "size",
}) <{ size?: keyof typeof sizes }>`
  ${({ size = "medium" }) => sizes[size]}
`;

export default Avatar;
