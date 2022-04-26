import React from 'react';
import classes from './LobbyPlayerContainer.module.css';
import PlayerCard from "../Player";
import {Grid, Typography} from "@mui/material";
import {Player} from "../../utils/Types/GameTypes";
import {styled} from "@mui/material/styles";
import PlayerCardStats from "../PlayerCardStats";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 48,
  marginRight: 10,
}));

interface Props {
  players: Player[];
  includeNumbers?: boolean;
}

function LobbyPlayerContainer({players, includeNumbers = false}: Props) {
  if (players.length == 0) {
    // TODO: Add a spinner instead of this
    return <div>No players</div>
  }

  return (
    <div className={classes.MainContainer}>
      <Grid container rowSpacing={3} columnSpacing={{xs: 2, sm: 3, md: 4}} direction="row" justifyContent="center"
            alignItems="center">
        {players.slice(0).map((player, index) => (
          <Grid item xs={6} key={index} display="flex" direction="row" justifyContent="center" alignItems="center">
            {includeNumbers && <HeaderTypography>{index + 1}</HeaderTypography>}
            <PlayerCard style={{flex:1}} playerName={player.playerName} playerAvatar={player.playerAvatar}
                        rightChild={player.playerStats ? (<PlayerCardStats CPM={player.playerStats.CPM} Accuracy={player.playerStats.Accuracy} Errors={player.playerStats.Errors}/>) : null}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LobbyPlayerContainer;