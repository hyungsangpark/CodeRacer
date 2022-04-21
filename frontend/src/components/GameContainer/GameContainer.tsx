import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import ProgressBar from "../ProgressBar";
import CodeInput from "../CodeInput";
import classes from "./GameContainer.module.css";
import {styled} from "@mui/material/styles";
import {useTimer} from 'react-timer-hook';

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
  onGameOver: () => void;
  totalGameTimeInSeconds: number;
  code: string;
}

function GameContainer({started, onGameOver, totalGameTimeInSeconds = 90, code}: Props) {
  const [progress, setProgress] = React.useState(0);
  const [correctKeyCount, setCorrectKeyCount] = React.useState(0);
  const [wrongKeyCount, setWrongKeyCount] = React.useState(0);

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
  } = useTimer({expiryTimestamp: new Date(Date.now() + totalGameTimeInSeconds * 1000), onExpire: () => onGameOver(), autoStart: false});

  const preStartTimer = useTimer({expiryTimestamp: new Date(Date.now() + 3 * 1000), onExpire: () => start(), autoStart: false});

  useEffect(() => {
    if (started && !isRunning) {
      preStartTimer.start();
    }

  }, [started]);

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
      <CodeInput started={isRunning} setProgress={setProgress} code={code} onGameOver={() => {
        pause();
        onGameOver();
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