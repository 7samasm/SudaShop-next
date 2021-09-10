import React, { useRef } from "react";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import usePage from "../../hooks/pagination";

const Sort = ({ match, history }) => {
  const {
    params: { page, sort, order, selector },
  } = match;

  const url = useRef(null);

  switch (selector) {
    case "all":
      url.current = `/products?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
    default:
      url.current = `/products/section/${selector}?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
  }

  const [data, createOnPageinationChangeHandler] = usePage(
    url.current,
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
        `/sort/${selector}/${sort}/${order}`
      )}
      baseSortUrl={`/sort/${selector}`}
    />
  ) : (
    <CardListSkeleton />
  );

  return renderPageOrSkeleton;
};

export default Sort;
