import React from "react";
import classes from "./MultiplayerMainNavContainer.module.css";
import { Alert, Typography } from "@mui/material";
import CustomButton from "../Buttons";
import { styled } from "@mui/material/styles";
import CustomInput from "../Input";
import MainContentsContainer from "../MainContentsContainer";

const SubheaderTypography = styled(Typography)({
  fontWeight: "400",
  fontSize: 21,
  marginRight: 15,
});

interface Props {
  onCreateClick: () => void;
  onJoinClick: () => void;
  onBackClick: () => void;
  setUsername: (userName: string) => void;
  showAlert: boolean;
}

function MultiplayerMainNavContainer({
  onCreateClick,
  onJoinClick,
  onBackClick,
  setUsername,
  showAlert,
}: Props) {
  return (
    <>
      <MainContentsContainer>
        <Typography variant="h2">Play Multiplayer</Typography>
        {showAlert && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            Username must be between 4 to 10 characters
          </Alert>
        )}
        <div className={classes.UsernameInputContainer}>
          <SubheaderTypography>Username:</SubheaderTypography>
          <CustomInput
            placeholder={localStorage.getItem("lastUserName")}
            onChange={(text) => {
              setUsername(text);
              localStorage.setItem("lastUserName", text);
            }}
          />
        </div>
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onCreateClick}>Create Lobby</CustomButton>
        <CustomButton onClick={onJoinClick}>Join Lobby</CustomButton>
        <CustomButton onClick={onBackClick}>Back</CustomButton>
      </div>
    </>
  );
}

export default MultiplayerMainNavContainer;
