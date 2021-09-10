import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CommentOutlined, AddCommentOutlined } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";

import { useHttp } from "../../../../hooks/http";
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const CommentsList = (props) => {
  const { comments, token, productId, isLoggedIn, status } = props;
  const [extendedComments, setExtendedComments] = useState([]);

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

  const addComment = (commentText) => {
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

  const deleteComment = (commentId) => {
    sendRequest(
      "admin/delete-comment",
      "post",
      { productId, commentId },
      commentId,
      "DELETE_COMMENT",
      token
    );
  };

  const renderCommentsOrNoCommentsAlert =
    extendedComments.length > 0 ? (
      extendedComments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment.commentText}
          createdBy={comment.userId.name}
          createdAt={comment.createdAt}
          showDeleteIcon={status === "ADMIN"}
          onCommentDeleted={() => deleteComment(comment._id)}
        />
      ))
    ) : (
      <Alert severity="warning">no comments found</Alert>
    );

  return (
    <Grid container direction="column">
      <LoadingSpinner open={loading} renderLoader={true} />
      <Box
        display="flex"
        className="my-4"
        color="#666"
        flexDirection={titleWithIconDirection}
      >
        <CommentOutlined color="inherit" />
        <Typography
          variant="body1"
          component="p"
          className="mx-1"
          color="inherit"
        >
          comments
        </Typography>
        <span>:</span>
      </Box>
      {renderCommentsOrNoCommentsAlert}
      {isLoggedIn && (
        <Fragment>
          <Box
            display="flex"
            className="my-4"
            color="#666"
            flexDirection={titleWithIconDirection}
          >
            <AddCommentOutlined color="inherit" />
            <Typography
              variant="body1"
              component="p"
              className="mx-1"
              color="inherit"
            >
              add Comment
            </Typography>
            <span>:</span>
          </Box>
          <AddComment onCommentAdded={addComment} />
        </Fragment>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  isLoggedIn: state.auth.token !== null,
  status: state.auth.user?.status,
});

export default connect(mapStateToProps)(CommentsList);
