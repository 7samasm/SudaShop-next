import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import TheHeader from "../ui/TheHeader/TheHeader";
import { Container, CssBaseline } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { getSession } from "next-auth/client";
import { DrawerProvider } from "../../ctxStore/drawerCtx";
import sectionsCtx from "../../ctxStore/sectionsCtx";
import authCtx from "../../ctxStore/authCtx";
import cartCtx from "../../ctxStore/cartCtx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#e91e63",
    },
  },
  direction: "ltr",
});

export default function DefaultLayout(props: { children: JSX.Element }) {
  const { loadSections } = useContext(sectionsCtx);
  const { authSuccess, startRefreshTokenTimer } = useContext(authCtx);
  const { loadCart } = useContext(cartCtx);
  async function onLayoutInit() {
    try {
      await loadSections();
      const session = await getSession();
      if (session) {
        const { accessToken, user, error } = session as {
          accessToken: string;
          user: any;
          error: any;
        };
        if (error) {
          throw new Error(error);
        }
        authSuccess(accessToken, user.userId, user);
        await loadCart(accessToken);
        return startRefreshTokenTimer(accessToken);
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
          jssStyles.parentElement!.removeChild(jssStyles);
        }
        if (timer) return () => clearTimeout(timer);
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
