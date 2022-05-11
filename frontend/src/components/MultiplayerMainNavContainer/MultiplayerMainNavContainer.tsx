import React from 'react';
import classes from './MultiplayerMainNavContainer.module.css';
import {Alert, Typography} from "@mui/material";
import CustomButton from "../Buttons";
import {styled} from "@mui/material/styles";
import CustomInput from "../Input";


const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 25,
  marginBottom: "4%"
}));

const SubheaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 18,
  marginRight: 15
}));


interface Props {
  onCreateClick: () => void;
  onJoinClick: () => void;
  onBackClick: () => void;
  setUsername: (userName: string) => void;
  showAlert: boolean;
}

function MultiplayerMainNavContainer({onCreateClick, onJoinClick, onBackClick, setUsername, showAlert}: Props) {
  return (
    <>
      <HeaderTypography>Play Multiplayer</HeaderTypography>
      {showAlert && <Alert severity="error">Username must be between 4 to 10 characters</Alert>}
      <div className={classes.UsernameInputContainer}>
        <SubheaderTypography>Username:</SubheaderTypography>
        <CustomInput onChange={(text) => setUsername(text)}/>
      </div>
      <div className={classes.ButtonContainer}>
        <CustomButton style={{marginRight: 5, marginLeft: 5}} onClick={onCreateClick} size="large">Create Lobby</CustomButton>
        <CustomButton style={{marginRight: 5, marginLeft: 5}} onClick={onJoinClick} size="large">Join Lobby</CustomButton>
        <CustomButton style={{marginRight: 5, marginLeft: 5}} onClick={onBackClick} size="large">Back</CustomButton>
      </div>
    </>
  );
}

export default MultiplayerMainNavContainer;

