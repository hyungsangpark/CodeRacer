import React from 'react';
import classes from './MultiplayerGamePlayerContainer.module.css';
import GameContainer from "../GameContainer/GameContainer";
import {Language, MultiplayerSettings} from "../../utils/Types/GameTypes";
import OtherPlayersLiveRaceStatsContainer from "../OtherPlayersLiveRaceStatsContainer";
import {Player, PlayerStats} from "../../utils/Types/SocketTypes";

interface Props {
  started: boolean;
  onGameOver: () => void;
  gameSettings: MultiplayerSettings;
  code: string;
  language?: Language;
  otherPlayers: Player[];
  updateStats: (stats: PlayerStats) => void;
}

function MultiplayerGamePlayerContainer({ started, onGameOver, gameSettings, code, otherPlayers, updateStats, language = "javascript" }: Props) {

  return (
    <div className={classes.MainContainer}>
      <OtherPlayersLiveRaceStatsContainer otherPlayers={otherPlayers}/>
      <GameContainer language={language} started={started} onGameOver={onGameOver} totalGameTimeInSeconds={parseInt(gameSettings.time)} code={code} updateStats={updateStats}/>
    </div>
  );
}

export default MultiplayerGamePlayerContainer;