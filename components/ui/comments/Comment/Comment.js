import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useTheme, makeStyles } from "@material-ui/styles";
import moment from "moment";

import img from "../../../../public/images/d.jpg";

const useStyles = makeStyles((theme) => {
  return {
    "mx-2": {
      margin: `0 ${theme.spacing(2)}px`,
    },
    "mb-3": {
      marginBottom: theme.spacing(3),
    },
  };
});

const Comment = ({
  comment,
  createdBy,
  createdAt,
  showDeleteIcon,
  onCommentDeleted,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const commentDirection = theme.direction === "ltr" ? "row" : "row-reverse";
  const commentAlignment = theme.direction === "ltr" ? "left" : "right";
  const btnAlignment = theme.direction === "ltr" ? "flex-end" : "flex-start";
  return (
    <Grid item>
      <Card
        className={classes["mb-3"]}
        elevation={4}
        style={{ borderRadius: 15 }}
      >
        <CardContent>
          {/* header  */}
          <Grid
            container
            alignItems="center"
            className={classes["mb-3"]}
            direction={commentDirection}
          >
            <Grid item>
              <Avatar src={img.src}></Avatar>
            </Grid>
            <Grid item className={classes["mx-2"]}>
              <Typography variant="caption" component="span">
                {createdBy}
              </Typography>
            </Grid>
            {/* spacer */}
            <Grid item style={{ flexGrow: 1 }}></Grid>
            <Grid item>
              <Typography variant="caption">
                {moment(createdAt).fromNow()}
              </Typography>
            </Grid>
          </Grid>
          {/* header  */}
          {/* comment and del icon */}
          <Grid container direction="column">
            <Typography variant="body2" align={commentAlignment}>
              {comment}
            </Typography>
            {/* <div style={{ flexGrow: 1 }}></div> */}
            {showDeleteIcon && (
              <IconButton
                style={{ alignSelf: btnAlignment, color: "red" }}
                onClick={onCommentDeleted}
              >
                <Delete />
              </IconButton>
            )}
          </Grid>
          {/* comment and del icon */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Comment;
