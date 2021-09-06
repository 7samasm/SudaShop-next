import React from "react";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const CardListSkeleton = () => {
  return (
    <Grid container spacing={1}>
      {[1, 2, 3].map((num) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={num}>
          <Skeleton variant="rect" style={{ height: 250, borderRadius: 15 }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardListSkeleton;
