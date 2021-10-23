import axiosBuilder from "../axios";
import { createContext, FC, useReducer } from "react";
import ICart from "../types/Cart";
import { IProduct } from "../types/Product";
import { reCalculateCartDataForDeletion } from "./util/cartCtx.util";

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
  async loadCart(token: string) {},
  addCartItem(data: [{ productId: IProduct; quantity: number }]) {},
  removeCartItem(id: string) {},
});

// <CartProvider>
export const CartProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initCart);

  function _setCart(cartData: ICart) {
    dispatch({ type: "SET_CART", cartData });
  }

  async function loadCart(token: string) {
    try {
      const { data } = await axiosBuilder(token).get<ICart>("/admin/cart");
      _setCart(data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "FALLBACK",
      });
    }
  }

  function removeCartItem(id: string) {
    const products = [...cartState.products];
    if (products.length > 0) {
      const cartData = reCalculateCartDataForDeletion(products, id);
      _setCart(cartData);
    }
  }

  function addCartItem(data: [{ productId: IProduct; quantity: number }]) {
    const initalCart: ICart = {
      products: [],
      totalItems: 0,
      totalPrice: 0,
    };
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      initalCart.products.push({
        ...el.productId,
        quantity: el.quantity,
      });
      initalCart.totalItems += el.quantity;
      initalCart.totalPrice += el.quantity * el.productId.price;
    }
    _setCart(initalCart);
  }

  return (
    <cartCtx.Provider
      value={{
        ...cartState,
        loadCart,
        addCartItem,
        removeCartItem,
      }}
    >
      {children}
    </cartCtx.Provider>
  );
};
//  <CartProvider/>
export default cartCtx;
