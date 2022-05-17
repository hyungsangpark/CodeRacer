import React, {useEffect, useRef} from 'react';
import {Typography} from "@mui/material";
import ProgressBar from "../ProgressBar";
import CodeInput from "../CodeInput";
import classes from "./GameContainer.module.css";
import {styled} from "@mui/material/styles";
import {useTimer} from 'react-timer-hook';
import {PlayerStats} from "../../utils/Types/SocketTypes";
import {Language} from "../../utils/Types/GameTypes";

const TimerTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 25,
  marginBottom: 10
}));

const StatItemTypography = styled(Typography)(({theme}) => ({
  marginLeft: 5,
  marginRight: 5,
  fontWeight: 'bold',
  fontSize: 18
}));

interface Props {
  started: boolean;
  onGameOver: (cpm: number, accuracy: number, error: number) => void;
  totalGameTimeInSeconds: number;
  code: string;
  updateStats?: (stats: PlayerStats) => void;
  language?: Language;
}

function GameContainer({started, onGameOver, totalGameTimeInSeconds = 90, code, updateStats, language}: Props) {
  const [progress, setProgress] = React.useState(0);
  const [correctKeyCount, setCorrectKeyCount] = React.useState(0);
  const [wrongKeyCount, setWrongKeyCount] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
  } = useTimer({
    expiryTimestamp: new Date(Date.now() + totalGameTimeInSeconds * 1000), onExpire: () => {
      onGameOver(getCPM(), getAccuracy(), wrongKeyCount);
    }, autoStart: false
  });

  const preStartTimer = useTimer({
    expiryTimestamp: new Date(Date.now() + 3 * 1000),
    onExpire: () => start(),
    autoStart: false
  });

  useEffect(() => {
    if (started && !isRunning) {
      preStartTimer.start();
    }

  }, [started]);

  useEffect(() => {
    if(gameOver) {
      pause();

      setProgress(progress);
      updateStats && updateStats({
        CPM: getCPM(),
        Accuracy: getAccuracy(),
        Errors: wrongKeyCount,
        Progress: progress,
      });

      onGameOver(getCPM(), getAccuracy(), wrongKeyCount);
    }
  }, [gameOver]);

  const getAccuracy = () => {
    if (correctKeyCount === 0 && wrongKeyCount === 0) {
      return 0;
    }
    return Math.floor((correctKeyCount / (correctKeyCount + wrongKeyCount)) * 100);
  };

  const getCPM = () => {
    if (correctKeyCount === 0 && wrongKeyCount === 0) {
      return 0;
    }

    const timeElapsed = totalGameTimeInSeconds - ((minutes * 60) + seconds);

    return Math.floor(((correctKeyCount + wrongKeyCount) / timeElapsed) * 60);
  };

  const getTime = () => {
    if (!isRunning && preStartTimer.isRunning) {
      return new Date(preStartTimer.seconds * 1000).toISOString().slice(14, 19);
    }

    let totalSeconds = (minutes * 60) + seconds;
    return new Date(totalSeconds * 1000).toISOString().slice(14, 19);
  };

  return (
    <div className={classes.mainContainer}>
      <TimerTypography>Time: {getTime()}</TimerTypography>
      <ProgressBar progress={progress}/>
      <CodeInput language={language} started={isRunning} setProgress={(num) => {
        setProgress(num);
        updateStats && updateStats({
          CPM: getCPM(),
          Accuracy: getAccuracy(),
          Errors: wrongKeyCount,
          Progress: num,
        });
      }} code={code} onGameOver={() => {
        setProgress(100);
        setGameOver(true);
      }} checkKeyPressed={(correct: boolean) => {
        correct ? setCorrectKeyCount(correctKeyCount + 1) : setWrongKeyCount(wrongKeyCount + 1)
      }}/>
      <div className={classes.statContainer}>
        <StatItemTypography>CPM: {getCPM()}</StatItemTypography>
        <StatItemTypography>Accuracy: {getAccuracy()}%</StatItemTypography>
        <StatItemTypography>Errors: {wrongKeyCount}</StatItemTypography>
      </div>
    </div>
  )
}

export default GameContainer;