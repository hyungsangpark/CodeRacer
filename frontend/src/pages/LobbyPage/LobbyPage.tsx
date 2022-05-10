import React, {useEffect} from 'react';
import classes from './LobbyPage.module.css';
import {styled} from "@mui/material/styles";
import {Grid, Typography} from "@mui/material";
import LobbyPlayerContainer from "../../components/LobbyPlayerContainer";
import CustomButton from "../../components/Buttons";
import {useLocation, useNavigate} from "react-router-dom";
import {SocketContext} from "../../api/sockers/Sockets";
import {Language, MultiplayerSettings} from "../../utils/Types/GameTypes";
import MultiplayerGameSettings from '../../components/MultiplayerGameSettings/MultiplayerGameSettings';
import MultiplayerGamePlayContainer from "../../components/MultiplayerGamePlayContainer";
import {Player, PlayerProgressDTO, PlayerStats} from "../../utils/Types/SocketTypes";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 25,
  marginBottom: "4%"
}));

interface propState {
  lobbyID?: string;
}

function LobbyPage() {
  const socketContext = React.useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isHost, setIsHost] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [ready, setReady] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [lobbyCode, setLobbyCode] = React.useState('');
  const [gameSettings, setGameSettings] = React.useState<MultiplayerSettings>({
    language: "javascript",
    time: "30",
    playerAmount: "5",
  });
  const [code, setCode] = React.useState(`const function(){
  const test = 1;
};`);

  useEffect(() => {
    if (!socketContext!!.connected) return;

    if (location.state) {
      const state = location.state as propState;

      if (state.lobbyID) {
        setLobbyCode(state.lobbyID);
      }
    }

    socketContext!.onCreateLobby((data) => {
      console.log(data);
      setIsHost(true);
      setLobbyCode(data.lobbyID);
    });

    socketContext!.onJoinLobby((data) => {
      console.log(data)

      setPlayers(data.players);
    });

    socketContext!.onUpdatePlayerProgress((data) => {
      console.log("Update ", data);

      setPlayers(data.players);
    })

    socketContext!.onStartGame((data) => {
      console.log("Start ", data);

      setCode(data.code);

      setGameSettings({...gameSettings, language: data.language as Language});

      setPlayers(data.players);
      setGameStarted(true);
    });

    socketContext!.onGameComplete((data) => {
      console.log("Game Complete ", data);

      data.players.forEach(p => {
        p.isMe = p.socketID === socketContext!.getId();
        p.isReady = false;
      });

      navigate("/results", {state: {players: data.players}});
    });

    return () => {
      socketContext!.removeListeners();
    }
  }, []);

  const onLeaveClick = () => {
    // Go to multiplayer page
    if (socketContext!.connected) {
      socketContext!.leaveLobby();
      socketContext!.disconnect();
    }

    navigate('/multiplayer');
  }

  const onSettingsClick = () => {
    setShowSettings(!showSettings)
  }

  const onStartClick = () => {
    // Check if all players are ready
    if (players.length > 0) {
      players.forEach((player) => {
        if (!player.isReady) {
          return;
        }
      });
    }

    socketContext!.startGame({lobbyID: lobbyCode, settings: gameSettings});
  }

  const onReadyClick = () => {
    setReady(!ready);

    socketContext!.readyLobby({lobbyID: lobbyCode});
  }

  const onGameOver = () => {
    socketContext!.completeGame({lobbyID: lobbyCode});
  }

  const updateStats = (stats: PlayerStats) => {
    socketContext!.updatePlayerProgress({...stats, lobbyID: lobbyCode});
  }

  console.log(gameSettings);

  return (
    <div className={classes.MainContainer}>
      {
        gameStarted ?
          <MultiplayerGamePlayContainer language={gameSettings.language} updateStats={updateStats} otherPlayers={players.filter(p => p.socketID !== socketContext!.getId())} started={gameStarted} onGameOver={onGameOver} gameSettings={gameSettings} code={code}/>
          :
          <>
            <HeaderTypography>Lobby Code: {lobbyCode}</HeaderTypography>
            {showSettings ? <MultiplayerGameSettings updateSettings={setGameSettings}/> : <LobbyPlayerContainer players={(() => {
              if (!players) return [];

              players.forEach(p => {p.isMe = p.socketID === socketContext!.getId()});

              return players;
            })()}/>}
            <Grid container rowSpacing={3} columnSpacing={{xs: 1}} direction="row" justifyContent="center"
                  alignItems="center">
              <Grid item xs={3}>
                <div className={classes.ButtonWrapper}><CustomButton size="large"
                                                                     onClick={onLeaveClick}>Leave</CustomButton>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.ButtonWrapper}><CustomButton size="large"
                                                                     onClick={onSettingsClick}>{showSettings ? "Lobby" : "Settings"}</CustomButton>
                </div>
              </Grid>
              {
                isHost &&
                <Grid item xs={3}>
                  <div className={classes.ButtonWrapper}><CustomButton size="large"
                                                                       onClick={onStartClick}>Start</CustomButton>
                  </div>
                </Grid>
              }
              <Grid item xs={3}>
                <div className={classes.ButtonWrapper}><CustomButton size="large" onClick={onReadyClick}
                                                                     selected={ready}>Ready</CustomButton></div>
              </Grid>
            </Grid>
          </>
      }
    </div>
  );
}

export default LobbyPage;