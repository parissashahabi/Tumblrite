import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducers";
import App from "./App";
import "./index.css";
import "./fonts/Vazir.ttf";

import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const store = configureStore({ reducer });

const theme = createTheme({
  palette: {
    primary: {
      light: "#9575cd",
      main: "#7e57c2",
      dark: "#673ab7",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff80ab",
      main: "#ff4081",
      dark: "#f50057",
      contrastText: "#fff",
    },
  },
});

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
);
