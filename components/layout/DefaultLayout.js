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
      console.log(session);
      if (session.error) {
        throw new Error("error accured");
      }
      authSuccess(session.accessToken, session.user.userId, session.user);
      await getAndSetCart(session.accessToken);
      if (session) {
        startRefreshTokenTimer(session.accessToken, session.refreshToken);
      }
    } catch (error) {
      throw error;
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
