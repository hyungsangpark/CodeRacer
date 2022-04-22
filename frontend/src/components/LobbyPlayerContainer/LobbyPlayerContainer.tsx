import React from 'react';
import classes from './LobbyPlayerContainer.module.css';
import PlayerCard from "../Player";
import {Grid} from "@mui/material";
import {Player} from "../../utils/Types/GameTypes";

interface Props {
  players: Player[];
}

function LobbyPlayerContainer({players}: Props) {
  if (players.length == 0){
    // TODO: Add a spinner instead of this
    return <div>No players</div>
  }

  return (
    <div className={classes.MainContainer}>
      <Grid container rowSpacing={3} columnSpacing={{xs: 2, sm: 3, md: 4}} direction="row" justifyContent="center" alignItems="center">
        <Grid container item xs={12} direction="row" justifyContent="center" alignItems="center">
          <PlayerCard style={{width:"50%"}} playerName={players[0].playerName} playerAvatar={players[0].playerAvatar}/>
        </Grid>
        {players.slice(1).map((player, index) => (
          <Grid item xs={6} key={index}>
            <PlayerCard playerName={player.playerName} playerAvatar={player.playerAvatar}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LobbyPlayerContainer;