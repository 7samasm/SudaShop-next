import React from "react";
import Link from "next/link";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import img from "../../../../public/images/d.jpg";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 115,
    backgroundSize: "contain",
    backgroundPosition: "center center",
  },
  "mb-2": { marginBottom: theme.spacing(2) },
  radios: {
    borderRadius: "16px",
  },
}));

const PanelItem: React.FC<{ title: string; id: string }> = ({ id, title }) => {
  const classes = useStyles();
  return (
    <Card elevation={3} className={classes["mb-2"] + " " + classes.radios}>
      <Link href={`/products/${id}`}>
        <CardActionArea>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Avatar src={img.src} style={{ width: 75, height: 75 }} />
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  align="justify"
                  style={{ maxHeight: 75, overflow: "hidden" }}
                >
                  {title} dolar sit ipsom dolar sit bnbd nabdnab sit bnbd
                  nabdnabsit bnbd nabdnabsit bnbd nabdnabsit
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default PanelItem;
