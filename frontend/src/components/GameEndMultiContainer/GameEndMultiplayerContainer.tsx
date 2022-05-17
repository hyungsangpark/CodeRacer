import LobbyPlayerContainer from "../LobbyPlayerContainer";
import { Player } from "../../utils/Types/SocketTypes";
import { CodeBlock } from "../../utils/Types/ApiTypes";

interface Props {
  players: Player[];
  codeBlock?: CodeBlock;
}

function GameEndMultiplayerContainer({
  players,
  codeBlock,
}: Props) {
  console.log(codeBlock);

  return <LobbyPlayerContainer players={players} includeNumbers showStats />;
}

export default GameEndMultiplayerContainer;
