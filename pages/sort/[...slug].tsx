import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import axiosBuilder from "../../axios";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../../hooks/pagination";
import IPagination from "../../types/Pagination";
import mapSortProps from "../../util/mapSortProps";

const Sort: FC<{ data: IPagination; headMeta: { [k: string]: string } }> = ({
  data,
  headMeta,
}) => {
  const router = useRouter();
  const [selector, sort, order] = router.query.slug as string[];
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
          sort {headMeta.selector} by{" "}
          {mapSortProps[headMeta.sort as "title" | "price" | "createdAt"]}{" "}
          {headMeta.order}
        </title>
      </Head>
      {renderPageOrSkeleton}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const [selector, sort, order, page] = query.slug as string[];
  let url: string;
  switch (selector) {
    case "all":
      url = `/products?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
    default:
      url = `/products/section/${selector}?sortBy=${sort}&orderBy=${order}&page=${page}`;
      break;
  }
  try {
    const { data } = await axiosBuilder().get<IPagination>(url);
    return {
      props: { data, headMeta: { selector, sort, order } },
    };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true };
  }
};

export default Sort;
