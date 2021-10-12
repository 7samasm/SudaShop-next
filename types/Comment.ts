// key={comment._id}
// comment={comment.commentText}
// createdBy={comment.userId.name}
// createdAt={comment.createdAt}
export interface IComment {
  _id: any;
  commentText: string;
  userId: any;
  createdAt: any;
}
