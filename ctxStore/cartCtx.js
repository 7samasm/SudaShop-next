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
    case "FALLBACK":
      return initCart;
    default:
      throw new Error("you sould n't be here");
  }
};

const cartCtx = createContext({
  ...initCart,
  setCart(cartData) {},
  async getAndSetCart(token) {},
});

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(reducer, initCart);
  function setCart(cartData) {
    dispatch({ type: "SET_CART", cartData });
  }
  async function getAndSetCart(token) {
    try {
      const { data } = await axiosBuilder(token).get("/admin/cart");
      dispatch({ type: "SET_CART", cartData: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FALLBACK" });
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
