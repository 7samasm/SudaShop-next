import Axios from "../axios";
import CartList from "../components/containers/CardList/CardList";
import CardListSkeleton from "../components/ui/Skeletons/CardListSkeleton";
import { useEffect, useState } from "react";
// import usePage from "../hooks/pagination";

const Index = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    Axios()
      .get("products?page=1")
      .then(({ data }) => {
        setData(data);
      });
  }, [setData]);
  const renderPageOrSkeleton = data ? (
    <CartList products={data.docs} />
  ) : (
    <CardListSkeleton />
  );
  return renderPageOrSkeleton;
};

// export async function getServerSideProps() {
//   const { data } = await Axios().get("products?page=1");
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default Index;
