import React, {useEffect} from 'react';
import classes from './SoloGamePage.module.css';
import GameContainer from "../../components/GameContainer/GameContainer";
import SoloGameSettings from "../../components/SoloGameSettings";
import {SoloSettings} from "../../utils/Types/GameTypes";
import {useNavigate} from "react-router-dom";
import {getRandomCodeBlock, postSoloMatchHistoryResults} from "../../api/Api";
import {useAuth0} from "@auth0/auth0-react";

type CodeBlockWIthId = {
    id?: string,
    codeBlock: string
}

function SoloGamePage() {
  const {isAuthenticated, getAccessTokenSilently} = useAuth0();

  const [started, setStarted] = React.useState(false);
  const [gameSettings, setGameSettings] = React.useState<SoloSettings>({
    language: "javascript",
    time: "30",
  })

  const [code, setCode] = React.useState<CodeBlockWIthId>({
    id: "",
    codeBlock: `const function(){
  const test = 1;
};`,
  });

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

      setCode({
        id: response.data.codeBlocks[0]._id,
        codeBlock: response.data.codeBlocks[0].code,
      });
      setStarted(true);
    });
  };

  const onGameOver = (cpm: number, accuracy: number, error: number) => {
    console.log("Game ended");

    isAuthenticated && getAccessTokenSilently().then(async (token) => {
      try {
        if (code.id === undefined) {
          throw new Error("Code block id is undefined");
        }

        await postSoloMatchHistoryResults({
          avgCPM: cpm,
          avgAccuracy: accuracy,
          avgErrors: error,
          codeBlockId: code.id,
        }, token)
      }
      catch (e) {
        console.log(e);
      }
    });

    navigate("/results", { state: { cpm, accuracy, error } });
  };

  const onBackClick = () => {
    navigate("/");
  };

  return (
    <div className={classes.MainContainer}>
      {
        started ?
          <GameContainer language={gameSettings.language} started={started} code={code.codeBlock} totalGameTimeInSeconds={parseInt(gameSettings!.time)} onGameOver={onGameOver}/>
        :
        <SoloGameSettings onBackClick={onBackClick} onStartGame={onStartGame}/>
      }
    </div>
  );
}

export default SoloGamePage;
