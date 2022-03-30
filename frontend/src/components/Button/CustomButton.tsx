import React from 'react';
import {styled} from "@mui/material/styles";
import {Button, buttonClasses} from "@mui/material";

const CustomStyledButton = styled(Button)(({theme}) => ({
  [`&.${buttonClasses.root}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
    borderRadius: 1000,
    whiteSpace: 'nowrap',
    minWidth: 'max-content',
  },
}));

interface Props {
  size?: "small" | "medium" | "large";
  onClick: () => void;
  children: String;
}

function CustomButton({size = "medium", onClick, children}: Props) {
  const height = size === "small" ? 32 : size === "medium" ? 48 : 64;
  const width = size === "small" ? 96 : size === "medium" ? 128 : 256;
  const fontSize = size === "small" ? 12 : size === "medium" ? 16 : 20;

  return <CustomStyledButton style={{height, width, fontSize, fontWeight: "bold"}}
                             onClick={onClick}>{children}</CustomStyledButton>;
}

export default CustomButton;