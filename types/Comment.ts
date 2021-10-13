import IUser from "./User";
export interface IComment {
  _id: string;
  commentText: string;
  userId: string | IUser;
  createdAt: string;
}
