import React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography } from "@mui/material";
import styles from "./Header.module.css";
import { Link, Outlet } from "react-router-dom";

const Icon = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.light,
  fontSize: "36px",
  paddingRight: "16px",
}));

const Name = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "32px",
  color: theme.palette.secondary.light,
}));

const LoginButton = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "21px",
  textAlign: "right",
}));

function Header() {
  // change loggedIn to context variable.
  const loggedIn = false;
  const loginButtonText = loggedIn ? "Profile" : "Login";
  const loginButtonRoute = loggedIn ? "/profile" : "/login";

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Toolbar className={styles.headerContainer}>
          <Link to="/" className={styles.logoContainer}>
            <Icon>$</Icon>
            <Name>CodeRacer</Name>
          </Link>
          <Link to={loginButtonRoute} style={{ textDecoration: "none" }}>
            <LoginButton>{loginButtonText}</LoginButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Header;
