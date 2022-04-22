import React, {useEffect} from 'react';
import classes from './LobbyPage.module.css';
import {styled} from "@mui/material/styles";
import {Grid, Typography} from "@mui/material";
import LobbyPlayerContainer from "../../components/LobbyPlayerContainer";
import CustomButton from "../../components/Buttons";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {SocketContext} from "../../api/sockers/Sockets";
import {Player} from "../../utils/Types/GameTypes";

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

  const [players, setPlayers] = React.useState<Player[]>([]);
  const [ready, setReady] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [lobbyCode, setLobbyCode] = React.useState('');

  useEffect(() => {
    if (!socketContext!!.connected) return;

    console.log(location.state);

    if (location.state) {
      const state = location.state as propState;

      if (state.lobbyID) {
        setLobbyCode(state.lobbyID);
      }
    }

    socketContext!.onCreateLobby((data) => {
      console.log(data);
      setLobbyCode(data.lobbyID);
    });

    socketContext!.onJoinLobby((data) => {
      console.log(data)
      setPlayers(data.playerNames.map((name) => ({playerName: name, playerAvatar: 'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34'})));
    });
  }, [socketContext!.connected])

  const onLeaveClick = () => {
    // Go to multiplayer page
    if (socketContext!.connected) {
      socketContext!.leaveLobby();
      socketContext!.disconnect();
    }

    navigate('/multiplayer');
  }

  const onSettingsClick = () => {
    setShowSettings(!showSettings);
  }

  const onStartClick = () => {
    // Go to game page
  }

  const onReadyClick = () => {
    setReady(!ready);
  }

  return (
    <div className={classes.MainContainer}>
      <HeaderTypography>Lobby Code: {lobbyCode}</HeaderTypography>
      <LobbyPlayerContainer players={players}/>
      <Grid container rowSpacing={3} columnSpacing={{xs: 1}} direction="row" justifyContent="center"
            alignItems="center">
        <Grid item xs={3}>
          <div className={classes.ButtonWrapper}><CustomButton size="large" onClick={onLeaveClick}>Leave</CustomButton>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.ButtonWrapper}><CustomButton size="large"
                                                               onClick={onSettingsClick}>{showSettings ? "Settings" : "Lobby"}</CustomButton>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.ButtonWrapper}><CustomButton size="large" onClick={onStartClick}>Start</CustomButton>
          </div>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.ButtonWrapper}><CustomButton size="large" onClick={onReadyClick}
                                                               selected={ready}>Ready</CustomButton></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LobbyPage;