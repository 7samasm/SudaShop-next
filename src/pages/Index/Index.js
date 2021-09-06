import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import CardList from "../../components/containers/CardList/CardList";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { useHttp } from "../../hooks/http";

const Index = ({ history }) => {
  const { data, sendRequest } = useHttp();
  useEffect(() => {
    sendRequest("products", "get");
  }, [sendRequest]);
  const handlePaginationChange = (event, page) => {
    history.push(`/page/${page}`);
  };
  const renderPageOrSkeleton = data ? (
    <Grid container direction="column" alignItems="center">
      <CardList products={data.docs} totalResult={data.totalDocs} />
      <Pagination
        count={data.totalPages}
        color="primary"
        className="my-4"
        onChange={handlePaginationChange}
      />
    </Grid>
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export default Index;
