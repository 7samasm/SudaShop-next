const initState = {
  products: null,
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state = initState, { type, cart }) => {
  switch (type) {
    case "SET_CART":
      const { products, totalItems, totalPrice } = cart;
      return {
        ...state,
        products,
        totalItems,
        totalPrice,
      };
    default:
      return state;
  }
};

export default cartReducer;
