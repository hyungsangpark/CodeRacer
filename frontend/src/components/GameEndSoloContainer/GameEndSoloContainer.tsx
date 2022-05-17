import classes from "./GameEndSoloContainer.module.css";
import ScoreDisplayItem from "../ScoreDisplay";
import { CodeBlock } from "../../utils/Types/ApiTypes";

interface Props {
  playerStats: {
    cpm: number;
    accuracy: number;
    error: number;
  };
  codeBlock?: CodeBlock;
}

function GameEndSoloContainer({ playerStats, codeBlock }: Props) {
  console.log(codeBlock);

  return (
    <div className={classes.ScoreDisplayContainer}>
      <ScoreDisplayItem score={playerStats.cpm} label="CPM" />
      <ScoreDisplayItem score={playerStats.accuracy} label="Accuracy" />
      <ScoreDisplayItem score={playerStats.error} label="Errors" />
    </div>
  );
}

export default GameEndSoloContainer;
