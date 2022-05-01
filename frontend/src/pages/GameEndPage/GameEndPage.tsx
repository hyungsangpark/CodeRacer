import React, {useEffect} from "react";
import {Player} from "../../utils/Types/SocketTypes";
import {useLocation, useNavigate} from "react-router-dom";
import GameEndMultiplayerContainer from "../../components/GameEndMultiContainer";
import GameEndSoloContainer from "../../components/GameEndSoloContainer";

interface multiPropState {
  players: Player[];
}

interface soloPropState {
  cpm: number;
  accuracy: number;
  error: number;
}

function GameEndPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMulti, setIsMulti] = React.useState(false);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [stats, setStats] = React.useState<soloPropState>({
    cpm: 0,
    accuracy: 0,
    error: 0,
  });

  useEffect(() => {
    if (location.state) {
      const state = location.state as multiPropState;

      if (state.players) {
        setPlayers(state.players);
        setIsMulti(true);
      }
      else {
        const state = location.state as soloPropState;

        setStats({
          cpm: state.cpm,
          accuracy: state.accuracy,
          error: state.error,
        });
      }
    }
  }, [location]);

  const onLeaveClick = () => {
    if (isMulti) {
      navigate("/multiplayer");
    }
    else {
      navigate("/");
    }
  };

  const onBackToLobbyClick = () => {

  };

  return (
    <>
      {
        isMulti ?
          <GameEndMultiplayerContainer players={players} onBackToLobbyClick={onBackToLobbyClick} onLeaveClick={onLeaveClick}/>
          :
          <GameEndSoloContainer onBackClick={onLeaveClick} playerStats={stats}/>
      }
    </>
  );
}

export default GameEndPage;