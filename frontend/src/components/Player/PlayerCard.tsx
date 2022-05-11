import React from "react";
import {
  Avatar,
  ButtonBase,
  Paper,
  paperClasses,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../utils/Theme";
import classes from "./PlayerCard.module.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const CustomStyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${paperClasses.root}`]: {
    backgroundColor: theme.palette.secondary.dark,
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "10px 15px",
    margin: "0",
  },
}));

const CustomStyledButton = styled(ButtonBase)({
  borderRadius: 10,
  overflow: "hidden",
  width: "100%",
  margin: "10px 0",
});

interface Props {
  playerName: string;
  playerAvatar: string;
  selected?: boolean;
  rightChild?: React.ReactNode;
  style?: React.CSSProperties;
  isMe?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function PlayerCard({
  playerName,
  playerAvatar,
  selected,
  rightChild,
  style,
  isMe = false,
  onClick,
}: Props) {
  return (
    <CustomStyledButton disabled={!onClick} onClick={onClick}>
      <CustomStyledPaper
        sx={{
          ...style,
          [`&.${paperClasses.root}`]: {
            backgroundColor: selected && theme.palette.primary.main,
          },
          ...(onClick && {
            "&:hover": {
              cursor: "pointer",
              backgroundColor: theme.palette.secondary.main,
            },
          }),
        }}
      >
        <div className={classes.mainChildContainer}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt={playerName}
            src={playerAvatar}
          />
          <Typography
            fontWeight="bold"
            sx={{ marginLeft: "20px", fontSize: 25 }}
          >
            {playerName}
          </Typography>
        </div>
        {rightChild}
        {isMe && <PersonOutlineIcon />}
      </CustomStyledPaper>
    </CustomStyledButton>
  );
}

export default PlayerCard;
