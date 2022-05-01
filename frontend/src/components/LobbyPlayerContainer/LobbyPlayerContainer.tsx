import React from 'react';
import classes from './LobbyPlayerContainer.module.css';
import PlayerCard from "../Player";
import {Grid, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import PlayerCardStats from "../PlayerCardStats";
import {Player} from "../../utils/Types/SocketTypes";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 48,
  marginRight: 10,
}));

interface Props {
  players: Player[];
  showStats?: boolean;
  includeNumbers?: boolean;
}

function LobbyPlayerContainer({players, showStats = false, includeNumbers = false}: Props) {
  if (players.length == 0) {
    // TODO: Add a spinner instead of this
    return <HeaderTypography style={{marginBottom: "10%"}}>No players</HeaderTypography>
  }

  return (
    <div className={classes.MainContainer}>
      <Grid container rowSpacing={3} columnSpacing={{xs: 2, sm: 3, md: 4}} direction="row" justifyContent="center"
            alignItems="center">
        {players.slice(0).map((player, index) => (
          <Grid item xs={6} key={index} style={{display:"flex"}}>
            {includeNumbers && <HeaderTypography>{index + 1}</HeaderTypography>}
            <PlayerCard isMe={player.isMe} style={{flex:1}} playerName={player.playerName} playerAvatar={'https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34'} selected={player.isReady}
                        rightChild={showStats ? (<PlayerCardStats CPM={player.playerStats.CPM} Accuracy={player.playerStats.Accuracy} Errors={player.playerStats.Errors}/>) : null}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LobbyPlayerContainer;