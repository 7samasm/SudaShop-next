import React, { useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { Grid } from "@material-ui/core";
import CardList from "../../components/containers/CardList/CardList";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { useHttp } from "../../hooks/http";

const Sections = ({ match, history }) => {
  const { data, sendRequest } = useHttp();

  useEffect(() => {
    const { section, page } = match.params;
    if (!Number.isInteger(+page) || +page === 0) return history.replace("/");
    sendRequest(`products/section/${section}?page=${page}`, "get");
  }, [sendRequest, match, history]);

  const handlePaginationChange = (event, page) => {
    history.push(`/sections/${match.params.section}/${page}`);
  };

  const renderPageOrSkeleton = data ? (
    <Grid container direction="column" alignItems="center">
      <CardList products={data.docs} totalResult={data.totalDocs} />
      {data.docs.length > 0 && (
        <Pagination
          page={+match.params.page}
          count={data.totalPages}
          color="primary"
          className="my-4"
          onChange={handlePaginationChange}
        />
      )}
    </Grid>
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export default Sections;
