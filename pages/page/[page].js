import { useRouter } from "next/router";
import axiosBuilder from "../../axios";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../../hooks/pagination";

const Index = ({ data }) => {
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

export async function getServerSideProps({ query }) {
  const { data } = await axiosBuilder().get(`products?page=${query.page}`);
  return {
    props: {
      data,
    },
  };
}

export default Index;
