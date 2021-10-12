export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  section: string;
  quantity?: number;
}
