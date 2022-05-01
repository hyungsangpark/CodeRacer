import React, {useState} from 'react';
import classes from './SoloGameSettings.module.css';
import {Typography} from "@mui/material";
import SettingSelector from "../SettingSelector";
import {Language, SoloSettings, TimeLimit} from "../../utils/Types/GameTypes";
import {styled} from "@mui/material/styles";
import CustomButton from "../Buttons";

const HeaderTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 25,
  marginBottom: "4%"
}));

const SettingKeyTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 18,
  marginBottom: 10,
  flex: 2,
}));

interface Props {
  onStartGame: (settings: SoloSettings) => void;
  onBackClick: () => void;
}

function SoloGameSettings({onStartGame, onBackClick}: Props) {
  // TODO: In the future move these to some kind of json settings file
  // So we can change them without having to change the code and in a single place
  const TimeSettingOptions: TimeLimit[] = ["30", "60", "90", "120"];
  const LanguageSettingsOptions: Language[] = ["Random", "Javascript"]

  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const onStartClick = () => {
    let selectedLanguage = LanguageSettingsOptions[selectedTimeIndex];

    if (selectedLanguageIndex === 0) {
      const randomLanguage = Math.floor(Math.random() * (LanguageSettingsOptions.length - 1)) + 1;
      selectedLanguage = LanguageSettingsOptions[randomLanguage];
    }

    const settings: SoloSettings = {
      timeLimit: TimeSettingOptions[selectedTimeIndex],
      language: selectedLanguage,
    }

    onStartGame(settings);
  }

  return (
    <div className={classes.MainContainer}>
      <HeaderTypography>Solo Game Settings</HeaderTypography>
      <div className={classes.SettingItem}>
        <SettingKeyTypography>Time Limit</SettingKeyTypography>
        <SettingSelector style={{flex: 1}} options={TimeSettingOptions} selectedIndex={selectedTimeIndex}
                         onSelect={(option) => setSelectedTimeIndex(option)}/>
      </div>
      <div className={classes.SettingItem}>
        <SettingKeyTypography>Language</SettingKeyTypography>
        <SettingSelector style={{flex: 1}} options={LanguageSettingsOptions} selectedIndex={selectedLanguageIndex}
                         onSelect={(option) => setSelectedLanguageIndex(option)}/>
      </div>
      <div className={classes.ButtonContainer}>
        <CustomButton style={{marginRight:5}} onClick={onBackClick} size="large">Back</CustomButton>
        <CustomButton style={{marginLeft:5}} onClick={onStartClick} selected size="large">Start</CustomButton>
      </div>
    </div>
  );
}

export default SoloGameSettings;