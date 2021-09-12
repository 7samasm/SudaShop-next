import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CardListSettings from "./CardListSettings";
import CardList from "./CardList";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    "my-2": {
      margin: theme.spacing(2),
    },
  };
});

const CartListWithSettingsAndPagination = ({
  products,
  totalResult,
  totalPages,
  onPaginationChange,
  baseSortUrl,
}) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Grid container direction="column" alignItems="center">
      {products.length > 0 && (
        <CardListSettings totalResult={totalResult} baseSortUrl={baseSortUrl} />
      )}
      <CardList products={products} />
      {products.length > 0 && (
        <Pagination
          page={parseInt(router.query.page) || 1}
          count={totalPages}
          color="primary"
          className={classes["my-2"]}
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
  onPaginationChange: PropTypes.func.isRequired,
  baseSortUrl: PropTypes.string.isRequired,
};

export default CartListWithSettingsAndPagination;
