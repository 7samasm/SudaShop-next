import React from "react";
import { Grid, Card, CardContent, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import img from "../../../../static/d.jpg";

const useStyles = makeStyles({
  media: {
    height: 115,
    backgroundSize: "contain",
    backgroundPosition: "center center",
  },
  radios: {
    borderRadius: "16px",
  },
});

function PanelItem(props) {
  const { title } = props;
  const classes = useStyles();
  return (
    <Card elevation={3} className={"mb-2 " + classes.radios}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Avatar src={String(img)} style={{ width: 75, height: 75 }} />
            {/* <CardMedia image={String(img)} className={classes.media} /> */}
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="body2"
              color="textPrimary"
              align="justify"
              style={{ maxHeight: 75, overflow: "hidden" }}
            >
              {title} dolar sit ipsom dolar sit bnbd nabdnab sit bnbd nabdnabsit
              bnbd nabdnabsit bnbd nabdnabsit
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PanelItem;
