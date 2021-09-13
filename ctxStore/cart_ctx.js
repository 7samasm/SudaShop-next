import axiosBuilder from "../axios";

const { createContext, useReducer } = require("react");

const initCart = {
  products: null,
  totalItems: 0,
  totalPrice: 0,
};

const reducer = (_, { type, cartData }) => {
  switch (type) {
    case "SET_CART":
      return cartData;
    default:
      throw new Error("you sould n't be here");
  }
};

const cartCtx = createContext({ ...initCart, setCart(cartData) {} });

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initCart);
  function setCart(cartData) {
    dispatch({ type: "SET_CART", cartData });
  }
  const ctx = {
    ...cartState,
    setCart,
  };
  return <cartCtx.Provider value={ctx}>{children}</cartCtx.Provider>;
};

export default cartCtx;
