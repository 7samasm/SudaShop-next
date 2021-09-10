import { useRouter } from "next/router";
import { useRef } from "react";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import usePage from "../../hooks/pagination";

const Index = () => {
  const router = useRouter();
  const [selector, sort, order, page] = router.query.slug;
  const url = useRef(null);
  switch (selector) {
    case "all":
      url.current = `/products?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
    default:
      url.current = `/products/section/${selector}?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
  }

  const [data, createOnPageinationChangeHandler] = usePage(url.current);
  const renderPageOrSkeleton = data ? (
    <CartListWithSettingsAndPagination
      products={data.docs}
      totalResult={data.totalDocs}
      totalPages={data.totalPages}
      onPaginationChange={createOnPageinationChangeHandler("/page")}
      baseSortUrl="/sort/all"
    />
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Index;
