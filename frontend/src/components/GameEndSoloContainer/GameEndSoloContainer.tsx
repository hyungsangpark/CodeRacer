import React from "react";
import classes from "./GameEndSoloContainer.module.css";
import ScoreDisplayItem from "../ScoreDisplay";
import CustomButton from "../Buttons";
import {CodeBlock} from "../../utils/Types/ApiTypes";
import ViewCodeContainer from "../ViewCodeContainer/ViewCodeContainer";

interface Props {
  playerStats: {
    cpm: number;
    accuracy: number;
    error: number;
  }
  onBackClick: () => void;
  codeBlock: CodeBlock;
}

function GameEndSoloContainer({playerStats, onBackClick, codeBlock}: Props) {
  const [isViewCode, setViewCode] = React.useState(false);
  console.log(codeBlock.code);

  return (
    <div className={classes.MainContainer}>
      <div className={classes.ScoreDisplayContainer}>
        <ScoreDisplayItem score={playerStats.cpm} label="CPM"/>
        <ScoreDisplayItem score={playerStats.accuracy} label="Accuracy"/>
        <ScoreDisplayItem score={playerStats.error} label="Errors"/>
      </div>
      {isViewCode && <ViewCodeContainer code = {codeBlock.code} language= {codeBlock.language}/>}
      <div className={classes.ButtonContainer}>
        <CustomButton style={{marginRight: 15}} onClick={onBackClick} size="large">Back</CustomButton>
        <CustomButton style = {{marginRight: 0}} onClick= {() => setViewCode(!isViewCode)} size = "large">{isViewCode ? "Close Code" : "View Code"}</CustomButton>
      </div>
    </div>
  );
}

export default GameEndSoloContainer;