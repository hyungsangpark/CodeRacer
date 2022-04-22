import React from 'react';
import {styled} from "@mui/material/styles";
import {TextField, textFieldClasses} from "@mui/material";

const CustomStyledInput = styled(TextField)(({theme}) => ({
  [`&.${textFieldClasses.root}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.light,
    borderRadius: 1000,
    fieldset: {
      borderRadius: 1000,
      borderWidth: 0,
    },
    input: {
      textAlign: 'center',
      fontWeight: 'normal',
      textTransform: 'uppercase',
      fontSize: "20px",
    },
  },
}));

interface Props {
  onChange: (text: string) => void;
}

function CustomInput({onChange}: Props) {
  return (
    <CustomStyledInput inputProps={{autoComplete: 'off'}} onChange={(e) => onChange(e.target.value)}/>
  );
}

export default CustomInput;