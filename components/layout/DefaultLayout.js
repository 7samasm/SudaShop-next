import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TheHeader from "../ui/TheHeader/TheHeader";
import { Container, CssBaseline } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { DrawerProvider } from "../../ctxStore/drawer_ctx";
import sectionsCtx from "../../ctxStore/sections_ctx";
import authCtx from "../../ctxStore/auth_ctx";
import cartCtx from "../../ctxStore/cart_ctx";

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
  const { loadSections } = useContext(sectionsCtx);
  const { refreshToken } = useContext(authCtx);
  const { getAndSetCart } = useContext(cartCtx);

  async function onLayoutInit() {
    try {
      await loadSections();
      const { token } = await refreshToken();
      await getAndSetCart(token);
    } catch (error) {
      throw errorr;
    }
  }

  useEffect(() => {
    onLayoutInit()
      .then(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DrawerProvider>
        <TheHeader />
      </DrawerProvider>
      <Container>{props.children}</Container>
    </ThemeProvider>
  );
}
