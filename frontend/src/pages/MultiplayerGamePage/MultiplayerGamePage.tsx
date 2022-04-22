import React, {useEffect} from 'react';
import classes from './MultiplayerGamePage.module.css';
import MultiplayerMainNavContainer from "../../components/MultiplayerMainNavContainer";
import JoinLobbyContainer from "../../components/JoinLobbyContainer";
import {useNavigate} from "react-router-dom";
import {SocketContext} from "../../api/sockers/Sockets";

function MultiplayerGamePage() {
  const socketContext = React.useContext(SocketContext);
  const navigate = useNavigate();

  const [showJoinLobby, setShowJoinLobby] = React.useState(false);

  useEffect(() => {
    socketContext!.connect();
    console.log('connected');
  },[])

  const tempTestPlayerName = Math.floor(Math.random() * 1000).toString();

  const onCreateClick = () => {
    // May need to pass state later not sure yet
    socketContext!.createLobby({playerName: tempTestPlayerName});
    navigate('/lobby');
  }

  const onJoinClick = (lobbyID: string) => {
    // Join lobby and go to Lobby screen
    console.log(lobbyID);
    socketContext!.joinLobby({playerName: tempTestPlayerName, lobbyID});
    navigate('/lobby', {state: {lobbyID}});
  }

  const onBackClick = () => {
    // Back to previous screen
    // if no prev screens in stack then go to home screen
  }

  return (
    <div className={classes.MainContainer}>
      {
        showJoinLobby ?
          <JoinLobbyContainer onBackClick={() => setShowJoinLobby(false)} onJoinClick={onJoinClick}/>
          :
          <MultiplayerMainNavContainer onCreateClick={onCreateClick} onJoinClick={() => setShowJoinLobby(true)} onBackClick={onBackClick}/>
      }
    </div>
  );
}

export default MultiplayerGamePage;