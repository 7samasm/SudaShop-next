import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CommentOutlined, AddCommentOutlined } from "@material-ui/icons";
import { useTheme, makeStyles } from "@material-ui/core/styles";

import { useHttp } from "../../../../hooks/http";
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useAuthContext } from "../../../../ctxStore/authCtx";
import { IComment } from "../../../../types/Comment";

const useStyles = makeStyles((theme) => {
  return {
    "mx-1": {
      margin: `0 ${theme.spacing(1)}px`,
    },
    "my-4": {
      margin: `${theme.spacing(4)}px 0`,
    },
  };
});

const CommentsList = ({
  comments,
  productId,
}: {
  comments: IComment[];
  productId: string;
}) => {
  const [extendedComments, setExtendedComments] = useState(comments);

  const classes = useStyles();
  const { user, token, isLoggedIn } = useAuthContext();
  const theme = useTheme();
  const { loading, data, reqIdentifier, reqExtra, sendRequest } = useHttp();
  const titleWithIconDirection =
    theme.direction === "ltr" ? "row" : "row-reverse";

  useEffect(() => {
    setExtendedComments(comments);
    console.log("%c [CommentsList useEffect 1st]", "color:#7b4bbb;");
  }, [comments]);

  useEffect(() => {
    console.log("%c [CommentsList useEffect 2nd]", "color:#7b4bbb;");
    if (!loading && reqIdentifier === "ADD_COMMENT") {
      setExtendedComments((oldCommentState) => [...oldCommentState, data]);
    } else if (!loading && reqIdentifier === "DELETE_COMMENT") {
      setExtendedComments((oldCommentState) =>
        oldCommentState.filter((el) => el._id !== reqExtra)
      );
    }
    return () => {
      console.log("[[cleanup called]]");
    };
  }, [data, reqIdentifier, loading, reqExtra, setExtendedComments]);

  const addComment = (commentText: string) => {
    const commentPyload = { commentText, productId };

    sendRequest(
      "admin/comment",
      "post",
      commentPyload,
      null,
      "ADD_COMMENT",
      token
    );
  };

  const deleteComment = (commentId: string) => {
    sendRequest(
      "admin/delete-comment",
      "post",
      { productId, commentId },
      commentId,
      "DELETE_COMMENT",
      token
    );
  };

  // const isShowDeleteIcon = (): boolean => {
  //   if (typeof user === 'object') {
  //     if (user.ha)
  //     return user.status === "ADMIN";
  //   }
  // };

  const renderCommentsOrNoCommentsAlert =
    extendedComments.length > 0 ? (
      extendedComments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onCommentDeleted={() => deleteComment(comment._id)}
          showDeleteIcon={user?.status === "ADMIN"}
        />
      ))
    ) : (
      <Alert severity="warning">no comments found</Alert>
    );

  return (
    <Grid container direction="column">
      <LoadingSpinner open={loading} renderLoader={true} />
      <Grid container className={classes["my-4"]}>
        <CommentOutlined color="inherit" />
        <Typography
          variant="body1"
          component="p"
          color="inherit"
          className={classes["mx-1"]}
        >
          comments
        </Typography>
        <span>:</span>
      </Grid>
      {renderCommentsOrNoCommentsAlert}
      {isLoggedIn && (
        <>
          <Grid container className={classes["my-4"]}>
            <AddCommentOutlined color="inherit" />
            <Typography
              variant="body1"
              component="p"
              color="inherit"
              className={classes["mx-1"]}
            >
              add Comment
            </Typography>
            <span>:</span>
          </Grid>
          <AddComment onCommentAdded={addComment} />
        </>
      )}
    </Grid>
  );
};

export default CommentsList;
