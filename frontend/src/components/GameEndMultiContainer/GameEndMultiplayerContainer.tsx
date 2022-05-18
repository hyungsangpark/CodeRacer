import React from 'react';
import classes from './GameEndMultiplayerContainer.module.css';
import LobbyPlayerContainer from "../LobbyPlayerContainer";
import CustomButton from "../Buttons";
import {Player} from "../../utils/Types/SocketTypes";
import {CodeBlock} from "../../utils/Types/ApiTypes";
import ViewCodeContainer from "../ViewCodeContainer/ViewCodeContainer";

interface Props {
  players: Player[];
  onBackClick: () => void;
  codeBlock: CodeBlock;
}

function GameEndMultiplayerContainer({players, onBackClick, codeBlock}: Props) {
  const [isViewCode, setViewCode] = React.useState(false);

  console.log(codeBlock.code);

  return (
    <div className={classes.MainContainer}>
      <LobbyPlayerContainer players={players} includeNumbers showStats/>
      {isViewCode && <ViewCodeContainer code = {codeBlock?.code} language= {codeBlock.language}/>}
      <div className={!isViewCode ? classes.ButtonContainer : ""}>
        <CustomButton onClick={onBackClick} size="large">Back</CustomButton>
        <CustomButton style = {{marginRight: 0}} onClick= {() => setViewCode(!isViewCode)} size = "large">{isViewCode ? "Close Code" : "View Code"}</CustomButton>
      </div>
    </div>
  );
}

export default GameEndMultiplayerContainer;