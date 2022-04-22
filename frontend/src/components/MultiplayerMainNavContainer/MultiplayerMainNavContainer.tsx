import React from 'react';
import classes from './MultiplayerMainNavContainer.module.css';
import {Typography} from "@mui/material";
import CustomButton from "../Buttons";
import {styled} from "@mui/material/styles";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 25,
  marginBottom: "4%"
}));

interface Props {
  onCreateClick: () => void;
  onJoinClick: () => void;
  onBackClick: () => void;
}

function MultiplayerMainNavContainer({onCreateClick, onJoinClick, onBackClick}: Props) {

  return (
    <>
      <HeaderTypography>Play Multiplayer</HeaderTypography>
      <div className={classes.ButtonContainer}>
        <CustomButton style={{marginBottom: 5}} onClick={onCreateClick} size="large">Create Lobby</CustomButton>
        <CustomButton style={{marginBottom: 5}} onClick={onJoinClick} size="large">Join Lobby</CustomButton>
        <CustomButton style={{marginBottom: 5}} onClick={onBackClick} size="large">Back</CustomButton>
      </div>
    </>
  );
}

export default MultiplayerMainNavContainer;

