import ICart from "../../../types/Cart";
import { IProduct } from "../../../types/Product";

export function reCalculateCartDataForDeletion(
  cartProducts: IProduct[],
  deletedId: string,
  totalItems: number,
  totalPrice: number
) {
  let data: ICart | null = null;
  const deletedCartProduct = cartProducts.find(
    (cartProduct) => cartProduct._id === deletedId
  );
  // console.log(`%c ${currItems}`, "color:teal;font-size:18px;");
  if (deletedCartProduct) {
    const filteredCartItems = cartProducts.filter(
      (cartProduct) => cartProduct._id !== deletedId
    );
    const total = totalItems - deletedCartProduct.quantity!;
    const calcTotalPrice =
      totalPrice - deletedCartProduct.quantity! * deletedCartProduct.price;
    data = {
      products: filteredCartItems,
      totalPrice: calcTotalPrice,
      totalItems: total,
    };
  }
  return data;
}
