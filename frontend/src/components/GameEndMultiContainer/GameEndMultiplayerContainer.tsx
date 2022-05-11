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
  onBackClick: () => void;
}

function GameEndMultiplayerContainer({players, onBackClick}: Props) {
  return (
    <div className={classes.MainContainer}>
      <HeaderTypography>Race Complete!</HeaderTypography>
      <LobbyPlayerContainer players={players} includeNumbers showStats/>
      <div>
        <CustomButton onClick={onBackClick} size="large">Back</CustomButton>
      </div>
    </div>
  );
}

export default GameEndMultiplayerContainer;