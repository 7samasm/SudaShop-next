import React, { useEffect } from "react";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { useHttp } from "../../hooks/http";

const IndexSort = ({ match, history }) => {
  const { data, sendRequest } = useHttp();

  useEffect(() => {
    const { sort, order, page } = match.params;
    if (!Number.isInteger(+page) || +page === 0) return history.replace("/");
    const url = `/products?sortBy=${sort}&orderBy=${order}&page=${page}`;
    console.log(url);
    sendRequest(url, "get");
  }, [sendRequest, match, history]);

  const handlePaginationChange = (event, page) => {
    const { sort, order } = match.params;
    history.push(`/sort/${sort}/${order}/${page}`);
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

export default IndexSort;
