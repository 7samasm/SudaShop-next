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
import cartCtx from "../../ctxStore/cart_ctx";
import authCtx from "../../ctxStore/auth_ctx";

const Cart = () => {
  const { data, sendRequest, reqExtra, loading } = useHttp();
  const { totalPrice, totalItems, products, setCart } = useContext(cartCtx);
  const { token } = useContext(authCtx);

  useEffect(() => {
    // console.log(data);
    if (data) {
      const filteredCartItems = products.filter(
        (cartItem) => cartItem._id !== reqExtra
      );
      const currItems = products.find((cartItem) => cartItem._id === reqExtra);
      // console.log(`%c ${currItems}`, "color:teal;font-size:18px;");
      if (currItems) {
        const total = totalItems - currItems.quantity;
        const calcTotalPrice =
          totalPrice - currItems.quantity * currItems.price;
        setCart({
          products: filteredCartItems,
          totalPrice: calcTotalPrice,
          totalItems: total,
        });
      }
    }
  }, [data, reqExtra, setCart, products, totalItems, totalPrice]);

  const deleteCartItem = (productId) => {
    sendRequest(
      `/admin/cart/${productId}`,
      "delete",
      null,
      productId,
      null,
      token
    );
  };
  const transformedCartItems = products?.map(
    ({ _id, title, price, quantity }) => (
      <Grid item key={_id}>
        <CartItem
          title={title}
          price={price}
          quantity={quantity}
          onDeleteCartItem={() => deleteCartItem(_id)}
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
