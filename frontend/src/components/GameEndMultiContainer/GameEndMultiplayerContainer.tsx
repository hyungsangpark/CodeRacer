import classes from "./GameEndMultiplayerContainer.module.css";
import LobbyPlayerContainer from "../LobbyPlayerContainer";
import { Player } from "../../utils/Types/SocketTypes";
import { CodeBlock } from "../../utils/Types/ApiTypes";
import ViewCodeContainer from "../ViewCodeContainer/ViewCodeContainer";

interface Props {
  players: Player[];
  isViewCode: boolean;
  codeBlock: CodeBlock;
}

function GameEndMultiplayerContainer({
  players,
  isViewCode,
  codeBlock,
}: Props) {
  console.log(codeBlock.code);

  return (
    <div className={classes.MainContainer}>
      <LobbyPlayerContainer players={players} includeNumbers showStats />
      {isViewCode && (
        <ViewCodeContainer
          code={codeBlock?.code}
          language={codeBlock.language}
        />
      )}
    </div>
  );
}

export default GameEndMultiplayerContainer;
