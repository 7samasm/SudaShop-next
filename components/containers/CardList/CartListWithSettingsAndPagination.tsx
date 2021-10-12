import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CardListSettings from "./CardListSettings";
import CardList from "./CardList";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IProduct } from "../../../types/Product";
import { ChangeEvent } from "react";

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
}: {
  products: IProduct[];
  totalResult: number;
  totalPages: number;
  onPaginationChange(e: ChangeEvent<any>, page: number): void;
  baseSortUrl: string;
}) => {
  const classes = useStyles();
  const router = useRouter();
  const slug = router.query?.slug;
  return (
    <Grid container direction="column" alignItems="center">
      {products.length > 0 && (
        <CardListSettings totalResult={totalResult} baseSortUrl={baseSortUrl} />
      )}
      <CardList products={products} />
      {products.length > 0 && (
        <Pagination
          page={
            parseInt(router.query.page + "") ||
            /*
             * if you use [...slug] so page param doesnt work
             * insted u can use slug param which contain rest of param in slug property
             * that store array of params => [sort,order,page]
             */
            parseInt(slug ? slug[slug.length - 1] : "1")
          }
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
