import React from "react";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import usePage from "../../hooks/pagination";

const Sections = ({ match, history }) => {
  const { section, page } = match.params;
  const [data, createOnPageinationChangeHandler] = usePage(
    `/products/section/${section}?page=${page}`,
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
        `/sections/${section}`
      )}
      baseSortUrl={`/sort/${section}`}
    />
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export default Sections;
