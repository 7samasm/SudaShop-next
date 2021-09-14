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
  try {
    const { data } = await axiosBuilder(null, true).get("/products");
    // const res = await fetch("http://localhost:3000/hpi/products");
    // const data = await res.json();
    return {
      props: {
        data,
      },
      revalidate: 100,
    };
  } catch (error) {
    console.log(error.message);
    return { notFound: true, revalidate: 100 };
  }
}

export default Index;
