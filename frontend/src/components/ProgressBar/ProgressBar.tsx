import React from "react";
import {styled} from '@mui/material/styles';
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';

interface Props {
  progress: number;
}

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 25,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function ProgressBar({progress}: Props) {


  return (
      <BorderLinearProgress style={{width: "100%"}} variant="determinate" value={progress}/>
  );
}

export default ProgressBar;