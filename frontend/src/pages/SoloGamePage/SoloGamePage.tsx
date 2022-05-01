import React from 'react';
import classes from './SoloGamePage.module.css';
import GameContainer from "../../components/GameContainer/GameContainer";
import SoloGameSettings from "../../components/SoloGameSettings";
import {SoloSettings} from "../../utils/Types/GameTypes";
import {useNavigate} from "react-router-dom";

function SoloGamePage() {
  const [started, setStarted] = React.useState(false);
  const [gameSettings, setGameSettings] = React.useState<SoloSettings | null>(null)

  const [code, setCode] = React.useState(`const function(){
  const test = 1;
};`);
  
  const navigate = useNavigate();

  const onStartGame = (settings: SoloSettings) => {
    setGameSettings(settings);
    setStarted(true);

    // Fetch the code from the api based on the settings provided of language and time
  };

  const onGameOver = (cpm: number, accuracy: number, error: number) => {
    console.log('Game ended');
    navigate('/results', {state:{cpm: cpm, accuracy: accuracy, error: error}});
  };

  const onBackClick = () => {
    navigate('/');
  };

  return (
    <div className={classes.MainContainer}>
      {
        started ?
          <GameContainer started={started} code={code} totalGameTimeInSeconds={parseInt(gameSettings!.timeLimit)} onGameOver={onGameOver}/>
        :
        <SoloGameSettings onBackClick={onBackClick} onStartGame={onStartGame}/>
      }
    </div>
  );
}

export default SoloGamePage;