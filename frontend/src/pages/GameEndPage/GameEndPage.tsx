import React, { useEffect } from "react";
import { Player } from "../../utils/Types/SocketTypes";
import { useLocation, useNavigate } from "react-router-dom";
import GameEndMultiplayerContainer from "../../components/GameEndMultiContainer";
import GameEndSoloContainer from "../../components/GameEndSoloContainer";
import {CodeBlock} from "../../utils/Types/ApiTypes";
import {getCodeBlock} from "../../api/Api";

interface multiPropState {
  players: Player[];
  codeBlockId?: string;
  toMain?: boolean;
}

interface soloPropState {
  cpm: number;
  accuracy: number;
  error: number;
  codeBlockId?: string;
  toMain?: boolean;
}

function GameEndPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMulti, setIsMulti] = React.useState(false);
  const [toMain, setToMain] = React.useState(true);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [stats, setStats] = React.useState<soloPropState>({
    cpm: 0,
    accuracy: 0,
    error: 0,
  });
  const [codeBlock, setCodeBlock] = React.useState<CodeBlock | undefined>(undefined);

  useEffect(() => {
    if (location.state) {
      const state = location.state as multiPropState;

      setToMain(state.toMain ?? true);

      if (state.players) {
        setPlayers(state.players);
        setIsMulti(true);

        if (state.codeBlockId) {
          console.log(state.codeBlockId);
          getCodeBlock(state.codeBlockId).then((codeBlock) => {
            setCodeBlock(codeBlock.data);
          });
        }
      } else {
        const state = location.state as soloPropState;

        setStats({
          cpm: state.cpm,
          accuracy: state.accuracy,
          error: state.error,
        });

        if (state.codeBlockId) {
          getCodeBlock(state.codeBlockId).then((codeBlock) => {
            setCodeBlock(codeBlock.data);
          });
        }
      }
    }
  }, [location]);

  const onBackClick = () => {
    if (toMain) {
      navigate(isMulti ? "/multiplayer" : "/");
    } else {
      navigate(-1);
    }
  };

  return isMulti ? (
    <GameEndMultiplayerContainer codeBlock={codeBlock} players={players} onBackClick={onBackClick} />
  ) : (
    <GameEndSoloContainer codeBlock={codeBlock} playerStats={stats} onBackClick={onBackClick} />
  );
}

export default GameEndPage;
