import DefaultLayout from "../components/layout/DefaultLayout";
import type { AppProps /*, AppContext */ } from "next/app";
import { SectionsProvider } from "../ctxStore/sectionsCtx";
import { AuthProvider } from "../ctxStore/authCtx";
import { CartProvider } from "../ctxStore/cartCtx";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <SectionsProvider>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </SectionsProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
