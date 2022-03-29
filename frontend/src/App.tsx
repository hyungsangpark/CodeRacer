import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./api/sockers/Sockets";
import Routes from "./pages/Routes/Routes";
import theme from "./utils/Theme";

function App() {
  return (
    <SocketContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </SocketContextProvider>
  );
}

export default App;
