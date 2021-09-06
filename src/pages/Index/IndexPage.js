import React from "react";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import usePage from "../../hooks/pagination";

const IndexPage = ({ match, history }) => {
  const [data, createOnPageinationChangeHandler] = usePage(
    `/products?page=${match.params.page}`,
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
      onPaginationChange={createOnPageinationChangeHandler("/page")}
      baseSortUrl="/sort"
    />
  ) : (
    <CardListSkeleton />
  );

  return renderPageOrSkeleton;
};

export default IndexPage;
