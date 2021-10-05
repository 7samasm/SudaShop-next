export function reCalculateCartDataForDeletion(
  cartProducts,
  deletedId,
  totalItems,
  totalPrice
) {
  let data = null;
  const deletedCartProduct = cartProducts.find(
    (cartProduct) => cartProduct._id === deletedId
  );
  // console.log(`%c ${currItems}`, "color:teal;font-size:18px;");
  if (deletedCartProduct) {
    const filteredCartItems = cartProducts.filter(
      (cartProduct) => cartProduct._id !== deletedId
    );
    const total = totalItems - deletedCartProduct.quantity;
    const calcTotalPrice =
      totalPrice - deletedCartProduct.quantity * deletedCartProduct.price;
    data = {
      products: filteredCartItems,
      totalPrice: calcTotalPrice,
      totalItems: total,
    };
  }
  return data;
}
