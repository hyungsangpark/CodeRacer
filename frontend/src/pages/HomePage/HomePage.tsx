import {Typography} from "@mui/material";
import React from "react";
import classes from './HomePage.module.css';
import WelcomeCode from "../../components/WelcomeCode";
import CustomButton from "../../components/Buttons";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const onPlaySoloClick = () => {
        navigate('/solo');
    };

    const onPlayMultiplayerClick = () => {
        navigate('/multiplayer');
    };

    return (
        <div className={classes.MainContainer}>
            <Typography variant="h5">Learn Programming Through Competition</Typography>
            <div className={classes.WelcomeCodeContainer}>
                <WelcomeCode
                    code={`def codeRacerGreeting():
        print(“Hello, World!”)
        print(“CodeRacer welcomes you.”)`} language="python"
                />
            </div>
            <div className={classes.ButtonContainer}>
                <CustomButton style={{marginRight: 10}} onClick={onPlaySoloClick} size="large">Play Solo</CustomButton>
                <CustomButton onClick={onPlayMultiplayerClick} size="large">Play Multiplayer</CustomButton>
            </div>
        </div>
    );
}

export default HomePage;