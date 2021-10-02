import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  FormControl,
  TextField,
  CardHeader,
  Grid,
  Box,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { Settings, CheckCircleOutline, Category } from "@material-ui/icons";

import authCtx from "../../../ctxStore/authCtx";
import cartCtx from "../../../ctxStore/cartCtx";
import { useHttp } from "../../../hooks/http";

const CartDialog = ({ dialogValue, onShadowClick, style, productId }) => {
  const [inputIconColor, setInputIconColor] = useState("inherit");
  const theme = useTheme();
  const quantityInput = useRef("");
  const { data, sendRequest } = useHttp();
  const { token } = useContext(authCtx);
  const { setCart } = useContext(cartCtx);

  useEffect(() => {
    if (data) {
      console.log(data);
      let products = [];
      let totalItems = 0;
      let totalPrice = 0;
      data.forEach((el, i) => {
        products.push({ ...el.productId, quantity: el.quantity });
        totalItems += el.quantity;
        totalPrice += el.quantity * el.productId.price;
      });
      setCart({ products, totalItems, totalPrice });
    }
  }, [data]);
  const dialogHeaderDir = theme.direction === "ltr" ? "row" : "row-reverse";
  const dialogBtnDir = theme.direction === "ltr" ? "row-reverse" : "row";
  const toggleInputColor = (e) => {
    switch (e.type) {
      case "focus":
        setInputIconColor("secondary");
        break;
      default:
        setInputIconColor("inherit");
    }
  };
  const addItemToCart = () => {
    onShadowClick();
    const quantity = quantityInput.current.value;
    sendRequest(
      "/admin/cart",
      "post",
      { productId, quantity },
      null,
      null,
      token
    );
    // console.log(quantityInput.current.value);
  };
  return (
    <Dialog
      open={dialogValue}
      onClose={onShadowClick}
      style={{ ...style, position: "absolute" }}
      container={() => document.getElementById("dialog-container")}
    >
      <Card>
        <CardHeader
          title={
            <Box
              display="flex"
              flexDirection={dialogHeaderDir}
              alignItems="center"
            >
              <Settings color="primary" />
              <div className="mx-1"></div>
              <Typography variant="body2" color="primary">
                Settings
              </Typography>
            </Box>
          }
        />

        <CardContent>
          <FormControl fullWidth className="mb-4">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <Category color={inputIconColor} />
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <TextField
                  inputRef={quantityInput}
                  fullWidth
                  label="quantity"
                  color="secondary"
                  type="number"
                  variant="standard"
                  onFocus={toggleInputColor}
                  onBlur={toggleInputColor}
                />
              </Grid>
            </Grid>
          </FormControl>
          <Box display="flex" flexDirection={dialogBtnDir}>
            <Button
              dir={theme.direction}
              variant="text"
              color="primary"
              onClick={() => addItemToCart()}
            >
              <CheckCircleOutline />
              <span className="mx-1"></span> ok
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default CartDialog;
