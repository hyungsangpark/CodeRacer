import React, {useState} from 'react';
import classes from './MultiplayerGameSettings.module.css';
import {Typography} from "@mui/material";
import SettingSelector from "../SettingSelector";
import {Language, MultiplayerSettings, TimeLimit, PlayerAmount} from "../../utils/Types/GameTypes";
import {styled} from "@mui/material/styles";
import CustomButton from "../Buttons";
  
  const SettingKeyTypography = styled(Typography)(({theme}) => ({
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    flex: 2,
  }));


    function MultiplayerGameSettings() {
        // TODO: In the future move these to some kind of json settings file
        // So we can change them without having to change the code and in a single place
        const TimeSettingOptions: TimeLimit[] = ["30", "60", "90", "120"];
        const LanguageSettingsOptions: Language[] = ["Random", "Javascript"]
        const PlayerAmountOptions: PlayerAmount[] = ["2", "3", "4", "5"]
      
        const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
        const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
        const [selectedPlayerAmountIndex, setSelectedPlayerAmountIndex] = useState(0);
    return (
      <div className={classes.MainContainer}>
        <div className={classes.SettingItem}>
          <SettingKeyTypography>Time Limit</SettingKeyTypography>
          <SettingSelector style={{flex: 1}} options={TimeSettingOptions} selectedIndex={selectedTimeIndex}
                           onSelect={(option) => setSelectedTimeIndex(option)}/>
        </div>
        <div className={classes.SettingItem}>
          <SettingKeyTypography>Player Amount</SettingKeyTypography>
          <SettingSelector style={{flex: 1}} options={PlayerAmountOptions} selectedIndex={selectedPlayerAmountIndex}
                           onSelect={(option) => setSelectedPlayerAmountIndex(option)}/>
        </div>
        <div className={classes.SettingItem}>
          <SettingKeyTypography>Language</SettingKeyTypography>
          <SettingSelector style={{flex: 1}} options={LanguageSettingsOptions} selectedIndex={selectedLanguageIndex}
                           onSelect={(option) => setSelectedLanguageIndex(option)}/>
        </div>
      </div>
      
      
    );
}
  
  export default MultiplayerGameSettings;