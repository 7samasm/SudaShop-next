import { IProduct } from "./Product";
export default interface IPagination {
  docs: IProduct[];
  totalDocs: number;
  totalPages: number;
  limit: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
