import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import axiosBuilder from "../axios";
import CartListWithSettingsAndPagination from "../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../hooks/pagination";
import IPagination from "../types/Pagination";
// import usePage from "../hooks/pagination";

const Index: FC<{ data: IPagination }> = ({ data }) => {
  const { push } = useRouter();
  const renderPageOrSkeleton = data ? (
    <CartListWithSettingsAndPagination
      products={data.docs}
      totalResult={data.totalDocs}
      totalPages={data.totalPages}
      onPaginationChange={handlePaginationChange("/page", push)}
      baseSortUrl="/sort/all"
    />
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data } = await axiosBuilder().get<IPagination>("/products");
    // const res = await fetch("http://localhost:3000/hpi/products");
    // const data = await res.json();
    return {
      props: {
        data,
      },
      revalidate: 100,
    };
  } catch (error: any) {
    console.log(error.message);
    return { notFound: true, revalidate: 100 };
  }
};

export default Index;
