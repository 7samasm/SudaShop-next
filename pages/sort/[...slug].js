import Head from "next/head";
import { useRouter } from "next/router";
import axiosBuilder from "../../axios";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../../hooks/pagination";
import mapSortProps from "../../util/mapSortProps";

const Sort = ({ data, headMeta }) => {
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
  return (
    <>
      <Head>
        <title>
          sort {headMeta.selector} by {mapSortProps[headMeta.sort]}{" "}
          {headMeta.order}
        </title>
      </Head>
      {renderPageOrSkeleton}
    </>
  );
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
      props: { data, headMeta: { selector, sort, order } },
    };
  } catch (error) {
    console.log(error.message);
    return { notFound: true };
  }
}

export default Sort;
