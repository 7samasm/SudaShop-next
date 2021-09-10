import { Provider } from "react-redux";
import TheHeader from "../ui/TheHeader/TheHeader";
import store from "../../store";
import {
  createTheme,
  ThemeProvider,
  ServerStyleSheets,
} from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

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
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {new ServerStyleSheets().collect(
          <>
            <TheHeader></TheHeader>
            <Container>{props.children}</Container>
          </>
        )}
      </ThemeProvider>
    </Provider>
  );
}
