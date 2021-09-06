import React from "react";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import usePage from "../../hooks/pagination";

const Index = ({ history, match }) => {
  const [data, createOnPageinationChangeHandler] = usePage(
    `/products?page=1`,
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

export default Index;
