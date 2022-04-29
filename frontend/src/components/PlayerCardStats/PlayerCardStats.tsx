import React from 'react';
import classes from './PlayerCardStats.module.css';
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";

const MainStatTypography = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  fontSize: 18,
  marginRight: 3,
}));

const SubStatTypography = styled(Typography)(({theme}) => ({
  fontSize: 10,
  marginRight: 12,
  fontWeight: 'lighter',
}));


interface Props {
  CPM: number,
  Accuracy: number,
  Errors: number
}

function PlayerCardStats({CPM, Accuracy, Errors}: Props) {

  return (
    <div className={classes.MainContainer}>
      <MainStatTypography>{CPM}</MainStatTypography>
      <SubStatTypography>CPM</SubStatTypography>
      <MainStatTypography>{Accuracy}</MainStatTypography>
      <SubStatTypography>ACU</SubStatTypography>
      <MainStatTypography>{Errors}</MainStatTypography>
      <SubStatTypography>ERR</SubStatTypography>
    </div>
  )
}

export default PlayerCardStats;