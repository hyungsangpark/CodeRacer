import React from 'react';
import classes from './JoinLobbyContainer.module.css';
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import CustomInput from "../Input";
import CustomButton from "../Buttons";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 25,
  marginBottom: "4%"
}));

const SubHeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  marginBottom: 2
}));

interface Props {
  onBackClick: () => void;
  onJoinClick: (lobbyId: string) => void;
}

function JoinLobbyContainer({onBackClick, onJoinClick}: Props) {
  const [lobbyInput, setLobbyInput] = React.useState('');

  return (
    <>
      <HeaderTypography>Enter Lobby Code</HeaderTypography>
      <SubHeaderTypography>Lobby Code</SubHeaderTypography>
      <CustomInput onChange={(text) => setLobbyInput(text)}/>
      <div className={classes.ButtonContainer}>
        <CustomButton style={{marginRight: 5}} onClick={onBackClick} size="large">Back</CustomButton>
        <CustomButton style={{marginLeft: 5}} onClick={() => onJoinClick(lobbyInput)} size="large">Join Lobby</CustomButton>
      </div>
    </>
  );
}

export default JoinLobbyContainer;