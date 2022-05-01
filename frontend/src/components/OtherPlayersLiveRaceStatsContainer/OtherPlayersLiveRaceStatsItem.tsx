import React from 'react';
import classes from './OtherPlayersLiveRaceStats.module.css';
import {Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import ProgressBar from "../ProgressBar";
import {PlayerStats} from "../../utils/Types/SocketTypes";

const PlayerTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 18,
}));

interface Props {
  playerName: string;
  playerStats: PlayerStats;
}

function OtherPlayersLiveRaceStatsItem({playerName, playerStats}: Props) {
  return (
    <div className={classes.StatsItemContainer}>
      <PlayerTypography>{playerName}</PlayerTypography>
      <ProgressBar style={{  marginTop: 5, marginBottom: 5}} progress={playerStats.Progress}/>
      <PlayerTypography>CPM: {playerStats.CPM}</PlayerTypography>
    </div>
  );
}

export default OtherPlayersLiveRaceStatsItem;