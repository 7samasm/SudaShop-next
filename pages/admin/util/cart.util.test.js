import { reCalculateCartDataForDeletion } from "./cart.uitl";

describe("<CART => util>", () => {
  test("calculateCart data should work well", () => {
    const mapedProducts = [1, 2, 3].map((num) => ({
      _id: num,
      title: `product${num}`,
      price: num * 100,
      quantity: num,
    }));

    const { products, totalItems, totalPrice } = {
      products: mapedProducts,
      totalItems: 6,
      totalPrice: 1400,
    };
    const cartData = reCalculateCartDataForDeletion(
      products,
      2,
      totalItems,
      totalPrice
    );
    expect(cartData).toBeTruthy();
    expect(cartData).toEqual({
      products: products.filter((p) => p._id !== 2),
      totalItems: 4,
      totalPrice: 1000,
    });
  });
});
