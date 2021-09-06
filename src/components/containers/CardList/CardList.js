import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useTheme } from "@material-ui/styles";

import CardItem from "../../ui/CardItem/CardItem";
const CardList = ({ products, render, totalResult }) => {
  const theme = useTheme();
  const listDirection = theme.direction === "ltr" ? "row" : "row-reverse";
  const transformedItems = products.map((item) => {
    return (
      <Grid item key={item._id} xs={6} sm={4} md={3} lg={2} className="mb-3">
        <CardItem item={item} render={() => render && render(item)} />
      </Grid>
    );
  });
  return (
    <Grid container spacing={1} direction={listDirection}>
      {transformedItems.length > 0 ? (
        transformedItems
      ) : (
        <Grid item xs={12}>
          <Alert severity="warning">no ressults to show !</Alert>
        </Grid>
      )}
    </Grid>
  );
};

CardList.propTypes = {
  products: PropTypes.array.isRequired,
};

const mapStatesToProps = (state) => ({
  // products: state.prod.products,
  isLoggedIn: state.auth.token !== null,
});

export default connect(mapStatesToProps)(CardList);
