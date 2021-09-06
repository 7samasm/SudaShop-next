import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import TheHeader from "./components/ui/TheHeader/TheHeader";
import Routes from "./routes/Routes";
import { onClientInit } from "./store/actions";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#e91e63",
    },
    default: {
      main: "#fffff",
    },
  },
  direction: "ltr",
});

const App = (props) => {
  const { onClientInit } = props;
  useEffect(() => {
    onClientInit();
  }, [onClientInit]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TheHeader />
        <Routes />
      </ThemeProvider>
    </Router>
  );
};

// const mapStateToProps = (state) => ({
//   token: state.auth.token,
// });

export default connect(null, { onClientInit })(App);
