import ICart from "../../../types/Cart";
import { IProduct } from "../../../types/Product";
import { reCalculateCartDataForDeletion } from "./cart.uitl";

describe("<CART => util>", () => {
  test("calculateCart data should work well", () => {
    const mapedProducts: IProduct[] = [1, 2, 3].map((num) => ({
      _id: num.toString(),
      title: `product${num}`,
      price: num * 100,
      quantity: num,
      description: "desc",
      imageUrl: "",
      section: "",
    }));

    const { products, totalItems, totalPrice }: ICart = {
      products: mapedProducts,
      totalItems: 6,
      totalPrice: 1400,
    };
    const cartData = reCalculateCartDataForDeletion(
      products,
      "2",
      totalItems,
      totalPrice
    );
    expect(cartData).toBeTruthy();
    expect(cartData).toEqual({
      products: products.filter((p) => p._id !== "2"),
      totalItems: 4,
      totalPrice: 1000,
    });
  });
});
