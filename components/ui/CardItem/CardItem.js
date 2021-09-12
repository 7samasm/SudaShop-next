import React from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CurrencyFormat from "react-currency-format";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/styles";
import img from "../../../public/images/d.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 115,
    backgroundSize: "contain",
    backgroundPosition: "center center",
  },
  card: {
    borderRadius: "24px",
    // padding: "10px 0",
  },
});
const CardItem = ({ item, render }) => {
  const classes = useStyles();
  return (
    <Card elevation={5} className={classes.card}>
      {render()}
      <Link href={`/products/${item._id}`}>
        <CardActionArea style={{ padding: "10px 0" }}>
          <CardMedia
            className={classes.media}
            image={img.src}
            title="Contemplative Reptile"
          />
          <CardContent style={{ textAlign: "center" }}>
            <Typography
              noWrap
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              {item.title}
            </Typography>
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ marginBottom: 8 }}
            >
              {item.description}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="textPrimary"
              noWrap
            >
              <CurrencyFormat
                value={item.price}
                thousandSeparator
                displayType="text"
                decimalScale={2}
                suffix=" SDG"
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default CardItem;
