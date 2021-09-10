import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  FormControl,
  TextField,
  Box,
} from "@material-ui/core";

import { CheckCircleOutline } from "@material-ui/icons";

const AddComment = ({ onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    console.log("[AddComment 1st useEffect]");
  }, []);

  const add = () => {
    setCommentText("");
    onCommentAdded(commentText);
  };

  return (
    <Card elevation={4} style={{ borderRadius: 15 }}>
      <CardContent>
        <FormControl fullWidth className="mb-4">
          <TextField
            multiline
            label="your comment ..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </FormControl>
        <Box display="flex" flexDirection="row-reverse">
          <Button
            onClick={add}
            disabled={!commentText}
            className=""
            variant="outlined"
            color="primary"
            startIcon={<CheckCircleOutline />}
          >
            add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddComment;
