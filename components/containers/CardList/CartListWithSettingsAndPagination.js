import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CardListSettings from "./CardListSettings";
import CardList from "./CardList";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

const CartListWithSettingsAndPagination = ({
  products,
  totalResult,
  totalPages,
  onPaginationChange,
  baseSortUrl,
}) => {
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
          style={{ margin: "25px 0" }}
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
