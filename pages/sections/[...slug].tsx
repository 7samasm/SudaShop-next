import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import axiosBuilder from "../../axios";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../../hooks/pagination";
import IPagination from "../../types/Pagination";

const Index: FC<{ data: IPagination }> = ({ data }) => {
  const router = useRouter();
  const [section] = router.query.slug as string[];
  const renderPageOrSkeleton = data ? (
    <CartListWithSettingsAndPagination
      products={data.docs}
      totalResult={data.totalDocs}
      totalPages={data.totalPages}
      baseSortUrl={`/sort/${section}`}
      onPaginationChange={handlePaginationChange(
        `/sections/${section}`,
        router.push
      )}
    />
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const [section, page] = query.slug as string[];
  const { data } = await axiosBuilder().get<IPagination>(
    `/products/section/${section}?page=${page}`
  );
  return {
    props: {
      data,
    },
  };
};

export default Index;
