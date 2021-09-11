import { Provider } from "react-redux";
import store from "../../store";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TheHeader from "../ui/TheHeader/TheHeader";
import { Container, CssBaseline } from "@material-ui/core";
import { useEffect } from "react";

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

export default function DefaultLayout(props) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TheHeader></TheHeader>
        <Container>{props.children}</Container>
      </ThemeProvider>
    </Provider>
  );
}
