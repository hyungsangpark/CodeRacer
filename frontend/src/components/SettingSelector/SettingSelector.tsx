import React from "react";
import {styled} from "@mui/material/styles";
import {
  buttonBaseClasses,
  FormControl,
  InputLabel,
  MenuItem,
  menuItemClasses,
  Select,
  selectClasses
} from "@mui/material";
import theme from "../../utils/Theme";

const CustomSelect = styled(Select)(({theme}) => ({
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: 1000,
  width: "100%",
  textAlign: "center",
  fontSize: 18,
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const CustomOption = styled(MenuItem)(({theme}) => ({
  [`&.${menuItemClasses.root}`]: {
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
    textTransform: "uppercase",
  },
}));

interface Props {
  options: string[];
  onSelect: (option: number) => void;
  selectedIndex: number;
}

function SettingSelector({options, onSelect, selectedIndex}: Props) {
  return (
    <FormControl sx={{width: "100%"}}>
      <CustomSelect
        value={options[selectedIndex]}
        onChange={(event) => onSelect(options.indexOf(event.target.value as string))}
      >
        {options.map((option, index) => (
          <CustomOption key={index} value={option}>{option}</CustomOption>
        ))}
      </CustomSelect>
    </FormControl>
  );
}

export default SettingSelector;