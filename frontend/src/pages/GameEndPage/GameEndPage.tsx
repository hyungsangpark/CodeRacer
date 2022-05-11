import React, { useEffect } from "react";
import { Player } from "../../utils/Types/SocketTypes";
import { useLocation, useNavigate } from "react-router-dom";
import GameEndMultiplayerContainer from "../../components/GameEndMultiContainer";
import GameEndSoloContainer from "../../components/GameEndSoloContainer";

interface multiPropState {
  players: Player[];
  toMain?: boolean;
}

interface soloPropState {
  cpm: number;
  accuracy: number;
  error: number;
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

  useEffect(() => {
    if (location.state) {
      const state = location.state as multiPropState;

      setToMain(state.toMain ?? true);

      if (state.players) {
        setPlayers(state.players);
        setIsMulti(true);
      } else {
        const state = location.state as soloPropState;

        setStats({
          cpm: state.cpm,
          accuracy: state.accuracy,
          error: state.error,
        });
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
    <GameEndMultiplayerContainer players={players} onBackClick={onBackClick} />
  ) : (
    <GameEndSoloContainer playerStats={stats} onBackClick={onBackClick} />
  );
}

export default GameEndPage;
