import {Button, Container, TextField, Typography} from "@mui/material";
import React, {useEffect} from "react";
import classes from './HomePage.module.css';
import WelcomeCode from "../../components/WelcomeCode";
import CustomButton from "../../components/Buttons";

function HomePage() {
    const onPlaySoloClick = () => {
        // Go to solo player game logic
    }

    const onPlayMultiplayerClick = () => {
        // Go to multiplayer game logic
    }

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