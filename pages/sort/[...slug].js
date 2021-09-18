import { useRouter } from "next/router";
import axiosBuilder from "../../axios";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../../hooks/pagination";

const Sort = ({ data }) => {
  const router = useRouter();
  const [selector, sort, order] = router.query.slug;
  const renderPageOrSkeleton = data ? (
    <CartListWithSettingsAndPagination
      products={data.docs}
      totalResult={data.totalDocs}
      totalPages={data.totalPages}
      onPaginationChange={handlePaginationChange(
        `/sort/${selector}/${sort}/${order}`,
        router.push
      )}
      baseSortUrl={`/sort/${selector}`}
    />
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export async function getServerSideProps({ query }) {
  const [selector, sort, order, page] = query.slug;
  let url;
  switch (selector) {
    case "all":
      url = `/products?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
    default:
      url = `/products/section/${selector}?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
  }
  try {
    const { data } = await axiosBuilder().get(url);
    return {
      props: { data },
    };
  } catch (error) {
    console.log(error.message);
    return { notFound: true };
  }
}

export default Sort;
