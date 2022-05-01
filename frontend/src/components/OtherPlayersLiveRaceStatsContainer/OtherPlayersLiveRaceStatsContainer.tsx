import React from 'react';
import classes from './OtherPlayersLiveRaceStats.module.css';
import OtherPlayersLiveRaceStatsItem from "./OtherPlayersLiveRaceStatsItem";
import {Grid} from "@mui/material";
import {Player} from "../../utils/Types/SocketTypes";

interface Props {
  otherPlayers: Player[]
}

function OtherPlayersLiveRaceStatsContainer({otherPlayers}: Props) {
  return (
    <Grid container rowSpacing={3} columnSpacing={{xs: 2, sm: 3, md: 4}} direction="row" justifyContent="center"
          alignItems="center">
      {
        otherPlayers.map((otherPlayer, index) =>
          <Grid xs={3} item key={index}>
            <OtherPlayersLiveRaceStatsItem playerName={otherPlayer.playerName} playerStats={otherPlayer.playerStats}/>
          </Grid>
        )
      }
    </Grid>
  );
}

export default OtherPlayersLiveRaceStatsContainer;