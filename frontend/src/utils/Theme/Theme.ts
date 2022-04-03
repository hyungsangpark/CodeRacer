import {createTheme} from "@mui/material";
import React from "react";

const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto Mono", "Roboto", "sans-serif", "Arial"`,
    "fontSize": 14,
    "fontWeightRegular": 400,
    "fontWeightMedium": 600,
    "fontWeightBold": 700,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    primary: {
      light: "#adff00",
      main: "#4fcc4d",
      dark: "#3DA93B",
    },
    secondary: {
      light: "#FFFFFF",
      main: "#373535",
      dark: "#1F1F1F",
    },
  },
});

export default theme;