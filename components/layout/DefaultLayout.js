import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TheHeader from "../ui/TheHeader/TheHeader";
import { Container, CssBaseline } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { getSession } from "next-auth/client";
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
  const { authSuccess, startRefreshTokenTimer } = useContext(authCtx);
  const { getAndSetCart } = useContext(cartCtx);
  async function onLayoutInit() {
    try {
      await loadSections();
      const session = await getSession();
      if (session) {
        const { accessToken, user, error } = session;
        if (error) {
          throw new Error(error);
        }
        authSuccess(accessToken, user.userId, user);
        await getAndSetCart(accessToken);
        startRefreshTokenTimer(accessToken);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    onLayoutInit()
      .then((timer) => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
          jssStyles.parentElement.removeChild(jssStyles);
        }
        return () => clearTimeout(timer);
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
