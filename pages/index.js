import axiosBuilder from "../axios";
import CartListWithSettingsAndPagination from "../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../components/ui/Skeletons/CardListSkeleton";
// import usePage from "../hooks/pagination";

const Index = ({ data }) => {
  // const [data, createOnPageinationChangeHandler] = usePage(`/products?page=1`);
  const renderPageOrSkeleton = data ? (
    <CartListWithSettingsAndPagination
      products={data.docs}
      totalResult={data.totalDocs}
      totalPages={data.totalPages}
      onPaginationChange={() => {}}
      baseSortUrl="/sort/all"
    />
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

export async function getStaticProps() {
  const { data } = await axiosBuilder().get("products?page=1");
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}

export default Index;
