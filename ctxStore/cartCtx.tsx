import axiosBuilder from "../axios";
import { createContext, FC, useReducer } from "react";
import ICart from "../types/Cart";

const initCart: ICart = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

const reducer = (
  state: ICart,
  { type, cartData }: { type: string; cartData?: ICart }
) => {
  switch (type) {
    case "SET_CART":
      if (cartData) return cartData;
    case "FALLBACK":
      return initCart;
    default:
      throw new Error("you sould n't be here");
  }
};

const cartCtx = createContext({
  ...initCart,
  setCart(cartData: ICart) {},
  async getAndSetCart(token: string) {},
});

export const CartProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initCart);
  function setCart(cartData: ICart) {
    dispatch({ type: "SET_CART", cartData });
  }
  async function getAndSetCart(token: string) {
    try {
      const { data } = await axiosBuilder(token).get<ICart>("/admin/cart");
      dispatch({ type: "SET_CART", cartData: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "FALLBACK",
      });
    }
  }
  const ctx = {
    ...cartState,
    setCart,
    getAndSetCart,
  };
  return <cartCtx.Provider value={ctx}>{children}</cartCtx.Provider>;
};

export default cartCtx;
