import React from "react";
import {Typography} from "@mui/material";

interface Props {
  score: number;
  label: string;
  size?: "small" | "medium" | "large";
}

function ScoreDisplayItem({score, label, size = "large"}: Props) {
  const scoreSize = size === "small" ? 30 : size === "large" ? 80 : 45;
  const labelSize = size === "small" ? 10 : size === "large" ? 20 : 12;

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
      <Typography sx={{fontSize: scoreSize, fontWeight: "bold"}}>{score}</Typography>
      <Typography sx={{fontSize: labelSize, fontWeight: "bold"}}>{label}</Typography>
    </div>
  );
}

export default ScoreDisplayItem;