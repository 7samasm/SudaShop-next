import React from "react";
import PropTypes from "prop-types";
import CardListSettings from "./CardListSettings";
import CardList from "./CardList";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

const CartListWithSettingsAndPagination = ({
  products,
  totalResult,
  totalPages,
  history,
  match,
  onPaginationChange,
  baseSortUrl,
}) => {
  return (
    <Grid container direction="column" alignItems="center">
      <CardListSettings
        totalResult={totalResult}
        {...{ history, match }}
        baseSortUrl={baseSortUrl}
      />
      <CardList products={products} />
      {products.length > 0 && (
        <Pagination
          page={parseInt(match.params.page) || 1}
          count={totalPages}
          color="primary"
          className="my-4"
          onChange={onPaginationChange}
        />
      )}
    </Grid>
  );
};

CartListWithSettingsAndPagination.prototype = {
  products: PropTypes.array.isRequired,
  totalResult: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  baseSortUrl: PropTypes.string.isRequired,
};

export default CartListWithSettingsAndPagination;
