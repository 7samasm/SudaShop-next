import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CardListSettings from "./CardListSettings";
import CardList from "./CardList";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IProduct } from "../../../types/Product";
import { ChangeEvent, FC, useCallback } from "react";

const useStyles = makeStyles((theme) => {
  return {
    "my-2": {
      margin: theme.spacing(2),
    },
  };
});

type TCLWSAPProps = {
  products: IProduct[];
  totalResult: number;
  totalPages: number;
  onPaginationChange(e: ChangeEvent<any>, page: number): void;
  baseSortUrl: string;
  render?: Function;
};

// const extractPageNumber =

const CartListWithSettingsAndPagination: FC<TCLWSAPProps> = ({
  products,
  totalResult,
  totalPages,
  onPaginationChange,
  baseSortUrl,
  render,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const extractPageNumber = useCallback((): number => {
    let num = 1;
    const page = router.query.page;
    const slug = router.query.slug;
    if (typeof page === "string") num = +page;
    // last element in slug[] is page
    else if (Array.isArray(slug)) num = +slug[slug.length - 1];
    return num;
  }, [router]);

  return (
    <Grid container direction="column" alignItems="center">
      {products.length > 0 && (
        <CardListSettings totalResult={totalResult} baseSortUrl={baseSortUrl} />
      )}
      <CardList products={products} render={render} />
      {products.length > 0 && (
        <Pagination
          page={extractPageNumber()}
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
