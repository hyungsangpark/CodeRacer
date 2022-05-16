import React from "react";
import classes from "./GameEndSoloContainer.module.css";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import ScoreDisplayItem from "../ScoreDisplay";
import CustomButton from "../Buttons";
import {CodeBlock} from "../../utils/Types/ApiTypes";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 48,
  marginRight: 10,
  marginBottom: "4%",
}));

interface Props {
  playerStats: {
    cpm: number;
    accuracy: number;
    error: number;
  }
  onBackClick: () => void;
  codeBlock?: CodeBlock;
}

function GameEndSoloContainer({playerStats, onBackClick, codeBlock}: Props) {

  console.log(codeBlock);

  return (
    <div className={classes.MainContainer}>
      <HeaderTypography>Race Complete!</HeaderTypography>
      <div className={classes.ScoreDisplayContainer}>
        <ScoreDisplayItem score={playerStats.cpm} label="CPM"/>
        <ScoreDisplayItem score={playerStats.accuracy} label="Accuracy"/>
        <ScoreDisplayItem score={playerStats.error} label="Errors"/>
      </div>
      <div className={classes.ButtonContainer}>
        <CustomButton style={{marginRight: 0}} onClick={onBackClick} size="large">Back</CustomButton>
      </div>
    </div>
  );
}

export default GameEndSoloContainer;