import React, {useEffect} from 'react';
import GameContainer from "../../components/GameContainer/GameContainer";

function SoloGamePage() {
  const [code, setCode] = React.useState('');

  // Get this from settings before they start the game
  const totalGameTimeInSeconds = 90

  useEffect(() => {
    // Get code block from the api
    setCode(`const function(){
  const test = 1;
};`)
  }, []);

  const onGameOver = () => {
    console.log('Game ended');
  };

  return (
    <>{code && <GameContainer code={code} totalGameTimeInSeconds={totalGameTimeInSeconds} onGameOver={onGameOver}/>}</>
  );
}

export default SoloGamePage;