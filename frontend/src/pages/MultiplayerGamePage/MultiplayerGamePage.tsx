import React, {useEffect} from 'react';
import classes from './MultiplayerGamePage.module.css';
import MultiplayerMainNavContainer from "../../components/MultiplayerMainNavContainer";
import JoinLobbyContainer from "../../components/JoinLobbyContainer";
import {useNavigate} from "react-router-dom";
import { SocketContext } from "../../api/sockers/Sockets";
import Alert from '@mui/material/Alert';
import { setDefaultResultOrder } from 'dns/promises';
import {useAuth0} from "@auth0/auth0-react";


function MultiplayerGamePage() {
  const {user} = useAuth0();
  const socketContext = React.useContext(SocketContext);
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [showJoinLobby, setShowJoinLobby] = React.useState(false);
  const [showAlert, setAlert] = React.useState(false);
   


  useEffect(() => {
    socketContext!.connect();
    console.log('connected');
  },[])

  const onCreateClick = () => {
    if (username.length < 4 || username.length > 10) {
      setAlert(true);
    } else {
      socketContext!.createLobby({ playerName: username, sub: user?.sub });

      navigate('/lobby');
    }
  }

  const onJoinClick = (lobbyID: string) => {
    // TODO create an endpoint for checking if the lobby with code exists
    setAlert(false);
    socketContext!.joinLobby({playerName: username, lobbyID, sub: user?.sub});

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
          <MultiplayerMainNavContainer setUsername={setUsername} onCreateClick={onCreateClick} onJoinClick={() => 
            {if (username.length < 4 || username.length > 10) {
              setAlert(true);
            } else {
              setShowJoinLobby(true)}}
            }
            
             onBackClick={onBackClick} showAlert={showAlert}/>
      }
    </div>
  );
}

export default MultiplayerGamePage;