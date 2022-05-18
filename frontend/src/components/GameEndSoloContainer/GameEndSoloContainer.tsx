import classes from "./GameEndSoloContainer.module.css";
import ScoreDisplayItem from "../ScoreDisplay";
import { CodeBlock } from "../../utils/Types/ApiTypes";
import ViewCodeContainer from "../ViewCodeContainer/ViewCodeContainer";

interface Props {
  playerStats: {
    cpm: number;
    accuracy: number;
    error: number;
  };
  isViewCode: boolean;
  codeBlock: CodeBlock;
}

function GameEndSoloContainer({ playerStats, codeBlock, isViewCode }: Props) {
  return (
    <div className={classes.MainContainer}>
      <div className={classes.ScoreDisplayContainer}>
        <ScoreDisplayItem score={playerStats.cpm} label="CPM" />
        <ScoreDisplayItem score={playerStats.accuracy} label="Accuracy" />
        <ScoreDisplayItem score={playerStats.error} label="Errors" />
      </div>
      {isViewCode && (
        <ViewCodeContainer
          code={codeBlock.code}
          language={codeBlock.language}
        />
      )}
    </div>
  );
}

export default GameEndSoloContainer;
