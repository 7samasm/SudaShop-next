import React, { useEffect } from "react";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { useHttp } from "../../hooks/http";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";

const IndexPage = (props) => {
  const { match, history } = props;
  const { data, sendRequest } = useHttp();

  useEffect(() => {
    const page = match.params.page;
    if (!Number.isInteger(+page) || +page === 0) return history.push("/");
    sendRequest(`/products?page=${page}`, "get");
  }, [sendRequest, match, history]);

  const handlePaginationChange = (event, page) => {
    console.log("pnt called");
    history.push(`/page/${page}`);
  };

  const renderPageOrSkeleton = data ? (
    <CartListWithSettingsAndPagination
      products={data.docs}
      totalResult={data.totalDocs}
      totalPages={data.totalPages}
      history={history}
      match={match}
      onPaginationChange={handlePaginationChange}
      baseSortUrl="/sort"
    />
  ) : (
    <CardListSkeleton />
  );

  return renderPageOrSkeleton;
};

export default IndexPage;
