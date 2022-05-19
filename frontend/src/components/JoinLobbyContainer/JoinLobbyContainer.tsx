import React from "react";
import classes from "./JoinLobbyContainer.module.css";
import { styled } from "@mui/material/styles";
import { Alert, Typography } from "@mui/material";
import CustomInput from "../CustomInput";
import CustomButton from "../Buttons";
import MainContentsContainer from "../MainContentsContainer";

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 2,
}));

interface Props {
  onBackClick: () => void;
  onJoinClick: (lobbyId: string) => void;
  error?: string;
}

function JoinLobbyContainer({ onBackClick, onJoinClick, error }: Props) {
  const [lobbyInput, setLobbyInput] = React.useState("");

  return (
    <>
      <MainContentsContainer>
        <Typography variant="h2">Enter Lobby Code</Typography>
        <SubHeaderTypography>Lobby Code</SubHeaderTypography>
        <CustomInput onChange={(text) => setLobbyInput(text)} />
        {error !== undefined && error?.length > 0 && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {error}
          </Alert>
        )}
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onBackClick}>Back</CustomButton>
        <CustomButton onClick={() => onJoinClick(lobbyInput)}>
          Join Lobby
        </CustomButton>
      </div>
    </>
  );
}

export default JoinLobbyContainer;
