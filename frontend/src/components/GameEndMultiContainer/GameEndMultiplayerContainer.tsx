import React from 'react';
import classes from './GameEndMultiplayerContainer.module.css';
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import LobbyPlayerContainer from "../LobbyPlayerContainer";
import CustomButton from "../Buttons";
import {Player} from "../../utils/Types/SocketTypes";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 48,
  marginRight: 10,
  marginBottom: "4%",
}));

interface Props {
  players: Player[];
  onLeaveClick: () => void;
  onBackToLobbyClick: () => void;
}

function GameEndMultiplayerContainer({players, onLeaveClick, onBackToLobbyClick}: Props) {
  return (
    <div className={classes.MainContainer}>
      <HeaderTypography>Race Complete!</HeaderTypography>
      <LobbyPlayerContainer players={players} includeNumbers showStats/>
      <div>
        <CustomButton style={{marginRight: 10}} onClick={onLeaveClick} size="large">Leave Lobby</CustomButton>
        <CustomButton onClick={onBackToLobbyClick} size="large">Back To Lobby</CustomButton>
      </div>
    </div>
  );
}

export default GameEndMultiplayerContainer;