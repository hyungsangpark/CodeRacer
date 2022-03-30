import React from "react";
import {Avatar, Paper, paperClasses, TextField, textFieldClasses, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import theme from "../../utils/Theme";
import classes from "./PlayerCard.module.css";

const CustomStyledPaper = styled(Paper)(({theme}) => ({
  [`&.${paperClasses.root}`]: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 10,
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "10px 15px",
  },
}));

interface Props {
  playerName: string;
  playerAvatar: string;
  selected?: boolean;
  rightChild?: React.ReactNode;
}

function PlayerCard({playerName, playerAvatar, selected, rightChild}: Props) {
  return (
    <CustomStyledPaper sx={{[`&.${paperClasses.root}`]: {
        backgroundColor: selected && theme.palette.primary.main,
      }}}>
      <div className={classes.mainChildContainer}>
        <Avatar sx={{ width: 60, height: 60 }} alt={playerName} src={playerAvatar}/>
        <Typography fontWeight="bold" sx={{marginLeft: "20px", fontSize: 25}}>{playerName}</Typography>
      </div>
      {rightChild}
    </CustomStyledPaper>
  );
}

export default PlayerCard;