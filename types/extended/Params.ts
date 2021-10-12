import { ParsedUrlQuery } from "querystring";

export default interface IParams extends ParsedUrlQuery {
  [key: string]: any;
}
