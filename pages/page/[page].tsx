import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import axiosBuilder from "../../axios";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../../hooks/pagination";
import IPagination from "../../types/Pagination";

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axiosBuilder().get<IPagination>(
    `products?page=${query.page}`
  );
  return {
    props: {
      data,
    },
  };
};

export default Index;
