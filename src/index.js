import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarUtilsConfigurator } from "./utils/snackbarUtils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SnackbarUtilsConfigurator />
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
