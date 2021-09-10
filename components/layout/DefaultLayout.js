import { Provider } from "react-redux";
import TheHeader from "../ui/TheHeader/TheHeader";
import store from "../../store";
import {
  createTheme,
  ThemeProvider,
  ServerStyleSheets,
  StylesProvider,
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
  const sheet = new ServerStyleSheets();
  return (
    <Provider store={store}>
      {sheet.collect(
        <>
          <ThemeProvider theme={theme}>
            <TheHeader></TheHeader>
            <Container>{props.children}</Container>
          </ThemeProvider>
        </>
      )}
      {console.log("sheet ===> ", sheet.toString())}
    </Provider>
  );
}
