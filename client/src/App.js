import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from "@mui/material";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { purple } from "@mui/material/colors";
import axios from "axios";
import MainApp from "./mainApp";

const theme = createTheme(adaptV4Theme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: purple["700"],
    },
    secondary: {
      main: purple["700"],
    },
  },
}));

function App() {
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      axios.defaults.headers.common["x-access-token"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["x-access-token"];
    }
  }, []);

  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MainApp />
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
