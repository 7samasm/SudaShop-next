import DefaultLayout from "../components/layout/DefaultLayout";
import { SectionsProvider } from "../ctxStore/sections_ctx";
import { AuthProvider } from "../ctxStore/auth_ctx";
import { CartProvider } from "../ctxStore/cart_ctx";

function MyApp({ Component, pageProps }) {
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
