import { createContext, FC, useContext, useState } from "react";
import axiosBuilder from "../axios";
import IPagination from "../types/Pagination";
import { IProduct } from "../types/Product";

const productCtx = createContext<{
  mostCommonProducts: IProduct[];
  relatedProducts: IProduct[];
  loadMostCommonProducts: () => Promise<void>;
  loadRelatedProducts: () => Promise<void>;
}>({
  mostCommonProducts: [],
  relatedProducts: [],
  loadMostCommonProducts: async () => {},
  loadRelatedProducts: async () => {},
});

export const useProductContext = () => useContext(productCtx);

export const ProductsProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [mostCommonProducts, setMostCommonProducts] = useState<IProduct[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  async function loadMostCommonProducts(): Promise<void> {
    try {
      const { data } = await axiosBuilder().get<IProduct[]>(
        "/products/stats/common"
      );
      setMostCommonProducts(data);
    } catch (error) {
      console.log(error);
      setMostCommonProducts([]);
    }
  }

  async function loadRelatedProducts(): Promise<void> {
    try {
      const { data } = await axiosBuilder().get<IPagination>(
        "/products?limit=3"
      );
      setRelatedProducts(data.docs);
    } catch (error) {
      console.log(error);
      setRelatedProducts([]);
    }
  }
  return (
    <productCtx.Provider
      value={{
        mostCommonProducts,
        relatedProducts,
        loadMostCommonProducts,
        loadRelatedProducts,
      }}
    >
      {children}
    </productCtx.Provider>
  );
};

export default productCtx;
