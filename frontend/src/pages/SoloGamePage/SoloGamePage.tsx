import React, {useEffect} from 'react';
import classes from './SoloGamePage.module.css';
import GameContainer from "../../components/GameContainer/GameContainer";
import SoloGameSettings from "../../components/SoloGameSettings";
import {SoloSettings} from "../../utils/Types/GameTypes";
import {useNavigate} from "react-router-dom";
import {getRandomCodeBlock} from "../../api/Api";

function SoloGamePage() {
  const [started, setStarted] = React.useState(false);
  const [gameSettings, setGameSettings] = React.useState<SoloSettings>({
    language: "javascript",
    time: "30",
  })

  const [code, setCode] = React.useState(`const function(){
  const test = 1;
};`);
  
  const navigate = useNavigate();

  console.log(code);

  const onStartGame = (settings: SoloSettings) => {
    setGameSettings(settings);

    console.log(settings);

    getRandomCodeBlock({
      language: settings.language,
      time: settings.time,
    }).then((response) => {
      console.log(response);

      setCode(response.data.codeBlocks[0].code);
      setStarted(true);
    });
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
          <GameContainer language={gameSettings.language} started={started} code={code} totalGameTimeInSeconds={parseInt(gameSettings!.time)} onGameOver={onGameOver}/>
        :
        <SoloGameSettings onBackClick={onBackClick} onStartGame={onStartGame}/>
      }
    </div>
  );
}

export default SoloGamePage;