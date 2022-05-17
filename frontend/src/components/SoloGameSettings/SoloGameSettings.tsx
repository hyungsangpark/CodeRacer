import React, { useState } from "react";
import classes from "./SoloGameSettings.module.css";
import { Typography } from "@mui/material";
import SettingSelector from "../SettingSelector";
import { Language, SoloSettings, Time } from "../../utils/Types/GameTypes";
import { styled } from "@mui/material/styles";
import CustomButton from "../Buttons";
import MainContentsContainer from "../MainContentsContainer";

const SettingKeyTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 18,
  marginBottom: 10,
  flex: 2,
}));

interface Props {
  onStartGame: (settings: SoloSettings) => void;
  onBackClick: () => void;
}

function SoloGameSettings({ onStartGame, onBackClick }: Props) {
  // TODO: In the future move these to some kind of json settings file
  // So we can change them without having to change the code and in a single place
  const TimeSettingOptions: Time[] = ["30", "60", "90", "120"];
  const LanguageSettingsOptions: Language[] = ["random", "javascript", "java"];

  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const onStartClick = () => {
    let selectedLanguage = LanguageSettingsOptions[selectedLanguageIndex];

    if (selectedLanguageIndex === 0) {
      const randomLanguage =
        Math.floor(Math.random() * (LanguageSettingsOptions.length - 1)) + 1;
      selectedLanguage = LanguageSettingsOptions[randomLanguage];
    }

    const settings: SoloSettings = {
      time: TimeSettingOptions[selectedTimeIndex],
      language: selectedLanguage,
    };

    onStartGame(settings);
  };

  return (
    <>
      <MainContentsContainer>
        <Typography variant="h2">Solo Game Settings</Typography>
        <div className={classes.SettingItem}>
          <SettingKeyTypography>Time Limit</SettingKeyTypography>
          <SettingSelector
            style={{ flex: 1 }}
            options={TimeSettingOptions}
            selectedIndex={selectedTimeIndex}
            onSelect={(option) => setSelectedTimeIndex(option)}
          />
        </div>
        <div className={classes.SettingItem}>
          <SettingKeyTypography>Language</SettingKeyTypography>
          <SettingSelector
            style={{ flex: 1 }}
            options={LanguageSettingsOptions}
            selectedIndex={selectedLanguageIndex}
            onSelect={(option) => setSelectedLanguageIndex(option)}
          />
        </div>
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onBackClick}>Back</CustomButton>
        <CustomButton onClick={onStartClick} selected>
          Start
        </CustomButton>
      </div>
    </>
  );
}

export default SoloGameSettings;
