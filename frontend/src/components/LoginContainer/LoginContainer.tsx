import { Typography } from "@mui/material";
import React from "react";
import CustomButton from "../Buttons";
import styles from "./LoginContainer.module.css";
import { useAuth0 } from "@auth0/auth0-react";

function LoginContainer() {
  const { loginWithRedirect } = useAuth0();

  const onLogin = () => {
    loginWithRedirect();
  };

  const onRegister = () => {
    loginWithRedirect();
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
        <CustomButton onClick={onLogin}>Login</CustomButton>
        <CustomButton onClick={onRegister}>Register</CustomButton>
      </div>
    </div>
  );
}

export default LoginContainer;
