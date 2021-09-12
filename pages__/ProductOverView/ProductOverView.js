import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@material-ui/core";
import {
  Person,
  LocationCity,
  Money,
  Category,
  AddShoppingCart,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import Axios from "../../axios";
import img from "../../static/d.jpg";
import PanelList from "../../components/ui/side_panel/PanelList/PanelList";
import CartDialog from "./CartDialog";
import CommentsList from "../../components/ui/comments/CommentsList/CommentsList";
const useStyles = makeStyles((theme) => {
  return {
    media: {
      height: 300,
      backgroundSize: "contain !important",
      backgroundPosition: "center center",
    },
    paddingCol: {
      padding: "0 12PX",
    },
    changeItemOrderOnMobile: {
      [theme.breakpoints.down("md")]: {
        order: 2,
      },
    },
  };
});

const ProductOverView = (props) => {
  const { match, mostComments, productsMayWant, isLoggedIn, loggedUserId } =
    props;
  const classes = useStyles();
  const [postState, setPostState] = useState(null);
  const [dialogValue, setDialogValue] = useState(false);

  useEffect(() => {
    Axios()
      .get(`products/${match.params.id}`)
      .then(({ data }) => {
        setPostState(data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("%c [ProductOverView useEffect 1nd]", "color:blue;");
    // return () => {
    //   setPostState(null);
    // };
  }, [match]);

  useEffect(() => {
    console.log("%c [ProductOverView useEffect 2nd]", "color:red;");
  });

  const InfoOnChips = () => {
    const mapDataOnChips = [
      { name: `${postState?.price} SDG`, icon: Money },
      { name: postState?.userId.name, icon: Person },
      { name: "khartoum", icon: LocationCity },
      { name: postState?.section, icon: Category },
    ].map((el) => (
      <Grid item xs={6} lg={3} className="my-1" key={Math.random()}>
        <Grid container justifyContent="center">
          <Chip
            key={el.name}
            size="small"
            color="default"
            label={el.name}
            icon={<el.icon />}
          />
        </Grid>
      </Grid>
    ));
    return (
      <Grid container alignItems="center">
        {mapDataOnChips}
      </Grid>
    );
  };

  const toggleDialogValue = () => {
    setDialogValue(!dialogValue);
  };

  return (
    <Grid container justifyContent="flex-end">
      {/* side panels start */}
      <Grid
        item
        xs={12}
        md={5}
        className={classes.paddingCol + " " + classes.changeItemOrderOnMobile}
      >
        <PanelList title="see also" productList={productsMayWant} />
        <PanelList title="most comments" productList={mostComments} />
      </Grid>
      {/* side panels end */}
      {/* post-comment  start */}
      <Grid item xs={12} md={7} className={classes.paddingCol + " mb-5"}>
        <Card
          elevation={3}
          className="py-3"
          id="dialog-container"
          style={{ position: "relative" }}
        >
          <CartDialog
            dialogValue={dialogValue}
            onShadowClick={toggleDialogValue}
            productId={match.params.id}
          />
          <Grid container direction="column">
            <Grid item className="mb-2">
              <CardMedia className={classes.media} image={String(img)} />
            </Grid>
            <Grid item>{InfoOnChips()}</Grid>
            <Grid item>
              <CardContent>
                <Typography className="my-4">
                  {postState?.description}
                </Typography>
              </CardContent>
            </Grid>
            {isLoggedIn && loggedUserId !== postState?.userId._id && (
              <Grid item className="align-self-center">
                <Button
                  color="secondary"
                  startIcon={<AddShoppingCart />}
                  onClick={toggleDialogValue}
                >
                  add to cart
                </Button>
              </Grid>
            )}
          </Grid>
        </Card>
        {postState && (
          <CommentsList
            comments={postState.comments}
            productId={match.params.id}
          />
        )}
      </Grid>
      {/* post-comment  end */}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  mostComments: state.prod.mostComments,
  productsMayWant: state.prod.productsMayWant,
  isLoggedIn: !!state.auth.token,
  loggedUserId: state.auth.userId,
});

export default connect(mapStateToProps)(ProductOverView);
