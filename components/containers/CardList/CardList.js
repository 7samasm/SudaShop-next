import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useTheme } from "@material-ui/styles";

import CardItem from "../../ui/CardItem/CardItem";
const CardList = ({ products, render }) => {
  const theme = useTheme();
  const listDirection = theme.direction === "ltr" ? "row" : "row-reverse";
  const renderCardsOrAlert =
    products.length > 0 ? (
      products.map((item) => {
        return (
          <Grid
            item
            key={item._id}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            style={{ marginBottom: "14px" }}
          >
            <CardItem item={item} render={() => render && render(item)} />
          </Grid>
        );
      })
    ) : (
      <Grid item xs={12}>
        <Alert severity="warning">no ressults to show !</Alert>
      </Grid>
    );
  return (
    <Grid container spacing={1} direction={listDirection}>
      {renderCardsOrAlert}
    </Grid>
  );
};

CardList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default CardList;
