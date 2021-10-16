import { IProduct } from "./Product";

export default interface ICart {
  products: IProduct[];
  totalItems: number;
  totalPrice: number;
}
