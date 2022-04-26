import React from "react";
import classes from "./GameEndPage.module.css";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import {Player} from "../../utils/Types/GameTypes";
import LobbyPlayerContainer from "../../components/LobbyPlayerContainer";
import CustomButton from "../../components/Buttons";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 48,
  marginRight: 10,
  marginBottom: "4%",
}));

interface Props {
  players: Player[];
}

function GameEndPage() {
  const players: Player[] = [
    {
      playerName: 'Player 1',
      playerAvatar: 'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34',
      playerStats: {
        CPM: 123,
        Accuracy: 10,
        Errors: 23,
      }
    },
    {
      playerName: 'Player 2',
      playerAvatar: 'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34',
      playerStats: {
        CPM: 123,
        Accuracy: 10,
        Errors: 23,
      }
    },
    {
      playerName: 'Player 3',
      playerAvatar: 'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34',
      playerStats: {
        CPM: 123,
        Accuracy: 10,
        Errors: 23,
      }
    },
    {
      playerName: 'Player 4',
      playerAvatar: 'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34',
      playerStats: {
        CPM: 123,
        Accuracy: 10,
        Errors: 23,
      }
    },
  ];

  const onLeaveClick = () => {

  };

  const onBackToLobbyClick = () => {

  };

  return (
    <div className={classes.MainContainer}>
      <HeaderTypography>Race Complete!</HeaderTypography>
      <LobbyPlayerContainer players={players} includeNumbers/>
      <div>
        <CustomButton style={{marginRight: 10}} onClick={onLeaveClick} size="large">Leave Lobby</CustomButton>
        <CustomButton onClick={onBackToLobbyClick} size="large">Back To Lobby</CustomButton>
      </div>
    </div>
  );
}

export default GameEndPage;