import { IComment } from "./Comment";
import IUser from "./User";

export interface IProduct {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  section: string;
  _id?: string;
  createdAt?: string;
  comments?: IComment[] | string;
  userId?: IUser | string;
  quantity?: number;
}
