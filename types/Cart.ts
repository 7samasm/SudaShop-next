import { IProduct } from "./Product";

export default interface ICart {
  products: null | IProduct[];
  totalItems: number;
  totalPrice: number;
}
