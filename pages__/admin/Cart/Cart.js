import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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

import CartItem from "./CartItem";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import { useHttp } from "../../../hooks/http";
import { setCart } from "../../../store/actions";

const Cart = ({ cartItems, totalPrice, totalCartItems, setCart, token }) => {
  const { data, sendRequest, reqExtra, loading } = useHttp();
  useEffect(() => {
    // console.log(data);
    if (data) {
      const filteredCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== reqExtra
      );
      const currItems = cartItems.find((cartItem) => cartItem._id === reqExtra);
      // console.log(`%c ${currItems}`, "color:teal;font-size:18px;");
      if (currItems) {
        const totalItems = totalCartItems - currItems.quantity;
        const calcTotalPrice =
          totalPrice - currItems.quantity * currItems.price;
        setCart({
          products: filteredCartItems,
          totalPrice: calcTotalPrice,
          totalItems,
        });
      }
    }
  }, [data, reqExtra, setCart, cartItems, totalCartItems, totalPrice]);

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
  const transformedCartItems = cartItems.map(
    ({ _id, title, price, quantity }) => (
      <Grid item key={_id}>
        <Link to={`/product/${_id}`}>
          <CartItem
            title={title}
            price={price}
            quantity={quantity}
            onDeleteCartItem={() => deleteCartItem(_id)}
          />
        </Link>
      </Grid>
    )
  );
  const renderCartOrAlert =
    totalCartItems > 0 ? (
      <>
        <LoadingSpinner open={loading} renderLoader />
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
    );

  return (
    <Grid container direction="column" spacing={3}>
      {renderCartOrAlert}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isLoggedIn: state.auth.token !== null,
  cartItems: state.cart.products,
  totalCartItems: state.cart.totalItems,
  totalPrice: state.cart.totalPrice,
});

export default connect(mapStateToProps, { setCart })(Cart);
