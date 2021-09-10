import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import moment from "moment";

import img from "../../../../static/d.jpg";

const Comment = ({
  comment,
  createdBy,
  createdAt,
  showDeleteIcon,
  onCommentDeleted,
}) => {
  const theme = useTheme();
  const commentDirection = theme.direction === "ltr" ? "row" : "row-reverse";
  const commentAlignment = theme.direction === "ltr" ? "left" : "right";
  const btnAlignment = theme.direction === "ltr" ? "flex-end" : "flex-start";
  return (
    <Grid item>
      <Card className="mb-3" elevation={4} style={{ borderRadius: 15 }}>
        <CardContent>
          {/* header  */}
          <Grid
            container
            alignItems="center"
            className="mb-3"
            direction={commentDirection}
          >
            <Grid item>
              <Avatar src={String(img)}></Avatar>
            </Grid>
            <Grid item className="mx-2">
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
          <Box display="flex" flexDirection="column">
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
          </Box>
          {/* comment and del icon */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Comment;
