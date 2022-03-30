import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto Mono", "Roboto", "sans-serif", "Arial"`,
    "fontSize": 14,
    "fontWeightRegular": 400,
    "fontWeightMedium": 600,
    "fontWeightBold": 700,
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
  },
});

export default theme;
