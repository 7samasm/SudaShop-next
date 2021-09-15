import { useRouter } from "next/router";
import axiosBuilder from "../../axios";
import CartListWithSettingsAndPagination from "../../components/containers/CardList/CartListWithSettingsAndPagination";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import { handlePaginationChange } from "../../hooks/pagination";

const Index = ({ data }) => {
  const router = useRouter();
  const [section] = router.query.slug;
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

export async function getServerSideProps({ query }) {
  const [section, page] = query.slug;
  const { data } = await axiosBuilder(null, true).get(
    `/products/section/${section}?page=${page}`
  );
  return {
    props: {
      data,
    },
  };
}

export default Index;
