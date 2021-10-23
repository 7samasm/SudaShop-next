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
  addCartItem(product: IProduct) {},
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
  /**
   * @version 2.0.0
   * handle adding item to cart logic
   * @param newProduct
   */
  function addCartItem(newProduct: IProduct) {
    const copiedCartState = { ...cartState };
    if (newProduct.quantity) {
      copiedCartState.totalItems += newProduct.quantity;
      copiedCartState.totalPrice += newProduct.quantity * newProduct.price;

      const newProductIndex = cartState.products.findIndex(
        (existProduct) => existProduct._id === newProduct._id
      );
      // new prod already in the cart
      if (newProductIndex > -1) {
        copiedCartState.products[newProductIndex].quantity! +=
          newProduct.quantity;
      } else {
        copiedCartState.products.push(newProduct);
      }
      _setCart(copiedCartState);
    }
    // _setCart(initalCart);
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
