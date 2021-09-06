import React from "react";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import usePage from "../../hooks/pagination";

const IndexSort = ({ match, history }) => {
  const {
    params: { page, sort, order },
  } = match;

  const [data, createOnPageinationChangeHandler] = usePage(
    `/products?sortBy=${sort}&orderBy=${order}&page=${page}`,
    match,
    history
  );

  const renderPageOrSkeleton = data ? (
    <CartListWithSettingsAndPagination
      products={data.docs}
      totalResult={data.totalDocs}
      totalPages={data.totalPages}
      history={history}
      match={match}
      onPaginationChange={createOnPageinationChangeHandler(
        `/sort/${sort}/${order}`
      )}
      baseSortUrl="/sort"
    />
  ) : (
    <CardListSkeleton />
  );

  return renderPageOrSkeleton;
};

export default IndexSort;
