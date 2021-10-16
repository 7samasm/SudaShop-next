import React, { useContext, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { ClearAll, Functions } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import { useHttp } from "../../hooks/http";
import CartItem from "../../components/ui/cart/CartItem";
import cartCtx from "../../ctxStore/cartCtx";
import authCtx from "../../ctxStore/authCtx";
import { reCalculateCartDataForDeletion } from "./util/cart.uitl";

const Cart = () => {
  const { data, sendRequest, reqExtra, loading } = useHttp<string>();
  const { totalPrice, totalItems, products, setCart } = useContext(cartCtx);
  const { token } = useContext(authCtx);

  useEffect(() => {
    if (data) {
      const cartData = reCalculateCartDataForDeletion(products, reqExtra!);
      products.length > 0 && setCart(cartData);
    }
  }, [data, reqExtra, setCart, reCalculateCartDataForDeletion, products]);

  const deleteCartItem = (productId: string) => {
    sendRequest(
      `/admin/cart/${productId}`,
      "delete",
      undefined,
      productId,
      undefined,
      token!
    );
  };
  const transformedCartItems = products?.map(
    ({ _id, title, price, quantity }) => (
      <Grid item key={_id}>
        <CartItem
          title={title}
          price={price}
          quantity={quantity!}
          onDeleteCartItem={() => deleteCartItem(_id!)}
        />
      </Grid>
    )
  );
  const renderCartOrAlert = products && (
    <>
      <LoadingSpinner open={loading} renderLoader />
      {totalItems > 0 ? (
        <>
          <Grid item>
            <Typography component="p" variant="body2" color="textSecondary">
              <ClearAll /> cart items
            </Typography>
          </Grid>
          {transformedCartItems}
          <Grid item className="mt-4">
            <Typography component="p" variant="body2" color="textSecondary">
              <Functions /> total price
            </Typography>
          </Grid>
          <Grid item>
            <Card style={{ borderRadius: "1rem" }}>
              <List disablePadding>
                <ListItem>
                  <ListItemText>total</ListItemText>
                  <ListItemIcon>
                    <Typography component="p" variant="body1" color="primary">
                      {totalPrice} SDG
                    </Typography>
                  </ListItemIcon>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </>
      ) : (
        <Alert severity="warning">there 're no items to show</Alert>
      )}
    </>
  );

  return (
    <Grid container direction="column" spacing={3}>
      {renderCartOrAlert}
    </Grid>
  );
};

/* export async function getServerSideProps({ req, query }) {
  // const session = await getSession({ req });
  // console.log(chalk.bgBlueBright.white("session from gssp "), session);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth",
  //       permanent: false,
  //     },
  //   };
  // }
  if (!query?.token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { token, data } = query;
  // const { data } = await axiosBuilder(token).get("admin/cart");
  return {
    props: { token, cartData: JSON.parse(data) },
  };
}*/

export default Cart;
