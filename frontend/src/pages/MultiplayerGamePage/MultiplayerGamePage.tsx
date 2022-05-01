import React, {useEffect} from 'react';
import classes from './MultiplayerGamePage.module.css';
import MultiplayerMainNavContainer from "../../components/MultiplayerMainNavContainer";
import JoinLobbyContainer from "../../components/JoinLobbyContainer";
import {useNavigate} from "react-router-dom";
import {SocketContext} from "../../api/sockers/Sockets";

function MultiplayerGamePage() {
  const socketContext = React.useContext(SocketContext);
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [showJoinLobby, setShowJoinLobby] = React.useState(false);

  useEffect(() => {
    socketContext!.connect();
    console.log('connected');
  },[])

  const onCreateClick = () => {
    socketContext!.createLobby({playerName: username});
    navigate('/lobby');
  }

  const onJoinClick = (lobbyID: string) => {
    // TODO create an endpoint for checking if the lobby with code exists

    socketContext!.joinLobby({playerName: username, lobbyID});
    navigate('/lobby', {state: {lobbyID}});
  }

  const onBackClick = () => {
    navigate('/');
  }

  return (
    <div className={classes.MainContainer}>
      {
        showJoinLobby ?
          <JoinLobbyContainer onBackClick={() => setShowJoinLobby(false)} onJoinClick={onJoinClick}/>
          :
          <MultiplayerMainNavContainer setUsername={setUsername} onCreateClick={onCreateClick} onJoinClick={() => setShowJoinLobby(true)} onBackClick={onBackClick}/>
      }
    </div>
  );
}

export default MultiplayerGamePage;