import ICart from "../../../types/Cart";
import { IProduct } from "../../../types/Product";
/**
 * @version 2.0.0
 * @param cartProducts
 * @param deletedId
 * @returns ICart
 */
export function reCalculateCartDataForDeletion(
  cartProducts: IProduct[],
  deletedId: string
) {
  const data: ICart = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
  };

  cartProducts.forEach((cp) => {
    if (cp._id !== deletedId) {
      data.products?.push(cp);
      data.totalItems += cp.quantity!;
      data.totalPrice += cp.quantity! * cp.price;
    }
  });

  return data;
}
