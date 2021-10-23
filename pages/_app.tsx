import DefaultLayout from "../components/layout/DefaultLayout";
import type { AppProps /*, AppContext */ } from "next/app";
import { SectionsProvider } from "../ctxStore/sectionsCtx";
import { AuthProvider } from "../ctxStore/authCtx";
import { CartProvider } from "../ctxStore/cartCtx";
import { ProductsProvider } from "../ctxStore/productCtx";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <SectionsProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </SectionsProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default MyApp;
