import { Typography } from "@mui/material";
import React from "react";
import CustomButton from "../Buttons";
import styles from "./LoginContainer.module.css";

function LoginContainer() {
  const onLogin = () => {
    alert("Login not implmented yet");
  };

  const onRegister = () => {
    alert("Register not implmented yet");
  };

  return (
    <div className={styles.MainContainer}>
      <Typography
        sx={{
          fontSize: "32px",
          fontWeight: 700,
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Login or Register to View Profile.
      </Typography>

      <div className={styles.Spacer} />

      <div className={styles.ButtonsContainer}>
        <CustomButton size="large" onClick={onLogin}>
          Login
        </CustomButton>
        <CustomButton size="large" onClick={onRegister}>
          Register
        </CustomButton>
      </div>
    </div>
  );
}

export default LoginContainer;
