import React, { useEffect } from "react";
import classes from "./GameEndSoloPage.module.css";
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import ScoreDisplayItem from "../../components/ScoreDisplay";
import CustomButton from "../../components/Buttons";
import {useNavigate, useLocation} from "react-router-dom";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 48,
  marginRight: 10,
  marginBottom: "4%",
}));

interface propState {
    cpm?: number;
    accuracy?: number;
    error?: number;
  }

function GameEndSoloPage() {

  const navigate = useNavigate();

  const onLeaveClick = () => {
    navigate('/home');
  };

  const onBackToLobbyClick = () => {

  };

    const location = useLocation();

    const [cpm, setCPM] = React.useState(0);
    const [accuracy, setAccuracy] = React.useState(0);
    const [error, setError] = React.useState(0);

    useEffect(() => {
    
        if (location.state) {
            const state = location.state as propState;
    
            if (state.cpm) {
                setCPM(state.cpm);
            }
            if (state.accuracy) {
                setAccuracy(state.accuracy);
            }
            if (state.error) {
                setError(state.error);
            }
        }
    })

  return (
    <div className={classes.MainContainer}>
          <HeaderTypography>Race Complete!</HeaderTypography>
          <div className={classes.ScoreDisplayContainer}>
            <ScoreDisplayItem score={cpm} label="CPM" />
            <ScoreDisplayItem score={accuracy} label="Accuracy"/>
            <ScoreDisplayItem score={error} label="Errors"/>
          </div>
      <div className={classes.ButtonContainer}>
        <CustomButton style={{marginRight: 0}} onClick={onLeaveClick} size="large">Back</CustomButton>
      </div>
    </div>
  );
}

export default GameEndSoloPage;