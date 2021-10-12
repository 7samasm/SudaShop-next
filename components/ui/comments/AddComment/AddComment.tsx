import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  FormControl,
  TextField,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    "mb-3": {
      marginBottom: theme.spacing(3),
    },
  };
});

import { CheckCircleOutline } from "@material-ui/icons";

const AddComment = ({
  onCommentAdded,
}: {
  onCommentAdded: (commentText: string) => void;
}) => {
  const [commentText, setCommentText] = useState("");
  const classes = useStyles();
  useEffect(() => {
    console.log("[AddComment 1st useEffect]");
  }, []);

  const add = () => {
    onCommentAdded(commentText);
    setCommentText("");
  };

  return (
    <Card elevation={4} style={{ borderRadius: 15 }}>
      <CardContent>
        <FormControl fullWidth className={classes["mb-3"]}>
          <TextField
            multiline
            label="your comment ..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </FormControl>
        <Grid container direction="row-reverse">
          <Button
            onClick={add}
            disabled={!commentText}
            variant="outlined"
            color="primary"
            startIcon={<CheckCircleOutline />}
          >
            add
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddComment;
