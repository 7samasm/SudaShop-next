export const setCart = (cart) => {
  return (dispatch) => {
    dispatch({ type: "SET_CART", cart });
  };
};
